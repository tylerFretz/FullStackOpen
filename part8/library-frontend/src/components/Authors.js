import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries/authorQueries'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState(null)
  const [ authors, setAuthors ] = useState([])
  const [ editBirthYear ] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  let result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result.data])

  const handleNameChange = event => {
    event.preventDefault()

    setName(event.target.value)
  }

  const submit = event => {
    event.preventDefault()

    editBirthYear({ variables: { name, born } })

    setBorn('')
  }


  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={handleNameChange}>
          {authors.map(a => (
            <option value={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors