const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { createBookCountLoader } = require('./loaders/bookCountLoader')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const pubsub = new PubSub()

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((err) => {
		console.error('error connecting to MongoDB', err.message)
	})

const typeDefs = gql`

  type Author {
      name: String!
      born: Int
      bookCount: Int!
      id: ID!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type BookCount {
      bookCount: Int
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
      ): Book

      editBirthYear(
          name: String!
          setBornTo: Int!
      ): Author

      createUser(
        username: String!
        favouriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
	  bookAdded: Book!
  }
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),

		authorCount: () => Author.collection.countDocuments(),

		allBooks: async (root, args) => {
			let author
			if (args.genre && args.author) {
				author = await Author.findOne({ name: args.author })
				return Book.find()
					.where({
						author: author ? author._id : null,
						genres: { $in: [args.genre] }
					})
					.populate('author')
			}
			else if (args.genre && !args.author) {
				return Book.find()
					.where({ genres: { $in: [args.genre] } })
					.populate('author')
			}
			else if (args.author && !args.genre) {
				author = await Author.findOne({ name: args.author })
				return Book.find()
					.where({ author: author ? author._id : null })
					.populate('author')
			}
			else {
				return Book.find({}).populate('author')
			}
		},

		allAuthors: () => Author.find({}),

		me: (root, args, { currentUser }) => {
			return currentUser
		}
	},

	Author: {
		bookCount: async ({ id }, args, { bookCountLoader }) => {
			return bookCountLoader.load(id.toString())
		}
	},

	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			let author = await Author.findOne({ name: args.author })

			if (!author) {
				author = new Author({ name: args.author })
				try {
					await author.save()
				}
				catch (err) {
					throw new UserInputError('Author did not exist and a new author could not be created with that name', {
						invalidArgs: { author: args.author }
					})
				}
			}

			const book = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres
			})

			try {
				await book.save()
			}
			catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args
				})
			}

			const savedBook = await book.populate('author').execPopulate()

			pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

			return savedBook
		},

		editBirthYear: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const author = await Author.findOne({ name: args.name })

			if (!author) {
				throw new UserInputError('Author does exist with that name')
			}

			author.born = args.setBornTo

			try {
				await author.save()
			}
			catch (err) {
				throw new UserInputError('Could not updated birth year', {
					invalidArgs: args
				})
			}

			return author
		},

		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favouriteGenre: args.favouriteGenre
			})

			try {
				await user.save()
			}
			catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args
				})
			}

			return user
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if ( !user || args.password !== config.USER_PASSWORD ) {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}

			return { value: jwt.sign(userForToken, config.SECRET) }
		}
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const bookCountLoader = createBookCountLoader()

		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { bookCountLoader, currentUser }
		}

		return { bookCountLoader }
	}
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})