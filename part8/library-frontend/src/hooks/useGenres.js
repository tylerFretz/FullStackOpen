import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries/bookQueries'

const useGenres = () => {
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([{
        genres: [],
        hasGenres: false
    }])

    const getAllBooks = useQuery(ALL_BOOKS)

    useEffect(() => {
        const { called, networkStatus, data } = getAllBooks
        if ( called && networkStatus > 6 ) {
            const newBooks = data ? data.allBooks : books
            const bookGenres = newBooks.flatMap(b => b.genres.map( g => g.toLowerCase()))
            const genresToAdd = [...new Set(bookGenres)]
            setGenres({ genres: genresToAdd, hasGenres: true })
            setBooks(newBooks)
        }
        
    }, [books, getAllBooks])

    return genres
}

export default useGenres