import React from 'react'
import Table from 'react-bootstrap/Table'

const AuthorsTable = ({ authors }) => {
    return (
        <Table striped bordered hover responsive>
            <caption>List of Authors</caption>
            <thead className='thead-dark'>
                <tr>
                    <th>Name</th>
                    <th>Born</th>
                    <th>Books</th>
                </tr>
            </thead>
            <tbody>
                {authors.map((a) => (
                    <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AuthorsTable