const listHelper = require('../utils/list_helper')

describe('blog list tests', () => {
    test('dummy returns 1', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    test('return proper amount of upvotes', () => {
        const blogs = [
            { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', upvotes: 7, __v: 0 },
            { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', upvotes: 5, __v: 0 },
            { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', upvotes: 12, __v: 0 },
            { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', upvotes: 10, __v: 0 },
            { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', upvotes: 0, __v: 0 },
            { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', upvotes: 2, __v: 0 }
        ]

        const result = listHelper.totalUpvotes(blogs)
        expect(result).toBe(36)
    })
})

describe('find most popular blog', () => {
    test('returns String Reduction blog', () => {
        const blogs = [
            { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', upvotes: 7, __v: 0 },
            { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', upvotes: 5, __v: 0 },
            { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', upvotes: 12, __v: 0 },
            { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', upvotes: 10, __v: 0 },
            { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', upvotes: 0, __v: 0 },
            { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', upvotes: 2, __v: 0 }
        ]

        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({ _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', upvotes: 12, __v: 0 })
    })
})

describe('find most prolific author', () => {
    test('most blogs', () => {
        const blogs = [
            { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', upvotes: 7, __v: 0 },
            { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', upvotes: 5, __v: 0 },
            { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', upvotes: 12, __v: 0 },
            { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', upvotes: 10, __v: 0 },
            { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', upvotes: 0, __v: 0 },
            { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', upvotes: 2, __v: 0 }
        ]

        const result = listHelper.mostBlogs(blogs)

        expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })

    })
})

describe('find most upvoted author', () => {
    test('most upvotes', () => {
        const blogs = [
            { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', upvotes: 7, __v: 0 },
            { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', upvotes: 5, __v: 0 },
            { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', upvotes: 12, __v: 0 },
            { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', upvotes: 10, __v: 0 },
            { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', upvotes: 0, __v: 0 },
            { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', upvotes: 2, __v: 0 }
        ]

        const result = listHelper.mostLikes(blogs)

        expect(result).toEqual({ author: 'Edsger W. Dijkstra', upvotes: 17 })

    })
})
