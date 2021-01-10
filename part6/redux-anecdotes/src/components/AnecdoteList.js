import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div>
                { anecdote.content }
            </div>
            <div>
                <span>
                    has { anecdote.votes }
                </span>
                <button type="button" onClick={ handleClick }>vote</button>
            </div>
        </li>
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))

    return (
        <>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map( anecdote =>
                    <Anecdote
                        key= {anecdote.id }
                        anecdote={ anecdote }
                        handleClick={ () => dispatch(vote(anecdote.id)) }
                    />
                )}
            </ul>
            <br/>
        </>
    )
}

export default AnecdoteList