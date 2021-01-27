import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

const useUpdateCache = () => {
  const client = useApolloClient()

  const handleEmptyQueryErrors = useCallback(
    async (query, data) => {
      try {
        await client.query({ query })
      } 
      catch {
        client.writeQuery({
          query,
          data,
        })
      }
    },
    [client]
  )

  const withBook = useCallback(
    async (addedBook) => {
      try {
        client.readQuery({ query: ALL_BOOKS })
      } 
      catch (e) {
        if (e.name === "Invariant Violation") {
          await handleEmptyQueryErrors(ALL_BOOKS, { allBooks: [] })
        } 
        else 
            console.log(e.message)
      }

      const dataInCache = client.readQuery({ query: ALL_BOOKS })
      if (!includedIn(dataInCache.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInCache.allBooks.concat(addedBook) },
        })
      }
    },
    [client, handleEmptyQueryErrors]
  )

  return { withBook }
}

export default useUpdateCache