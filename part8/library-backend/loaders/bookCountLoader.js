const DataLoader = require('dataloader')
const _ = require('lodash')
const Book = require('../models/book')

const createBookCountLoader = () => {
	return new DataLoader(async (authorIds) => {
		const books = await Book.find({})
		const booksByAuthorId = books.map((b) => b.author)
		const authorIdCounts = _.countBy(booksByAuthorId, (id) => id)

		return authorIds.map((id) => authorIdCounts[id] || 0)
	})
}

module.exports = { createBookCountLoader }