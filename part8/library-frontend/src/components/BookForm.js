import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/authorQueries'
import { ALL_BOOKS, ADD_BOOK } from '../queries/bookQueries'

const BookForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState(null)
    const [genre, setGenre] = useState('')
    const [genreList, setGenreList] = useState([])

    const [ addBook ] = useMutation(ADD_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
    })

    const addGenre = event => {
        event.preventDefault()

        setGenreList(genreList.concat(genre))
        setGenre('')
    } 

    const submit = event => {
        event.preventDefault()

        addBook({ variables: { title, author, published, genres: genreList } })

        setTitle('')
        setAuthor('')
        setPublished('')
        setGenre('')
        setGenreList([])
    }

    if (!props.show) {
        return null
    }

    return (
        <>
            <h2>Add Book</h2>

            <form onSubmit={submit}>
                <div>
                    title <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    published <input value={published} onChange={({ target }) => setPublished(parseInt(target.value))} />
                </div>
                <div>
                    <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                    <button type="button" onClick={addGenre}>add genre</button>
                </div>
                <div>
                    genres: {genreList.join(' ')}
                </div>
                <button type="submit">create book</button>
            </form>
        </>
    )
}

export default BookForm