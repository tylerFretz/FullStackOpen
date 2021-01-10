import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes.sort((a, b) => b.votes - a.votes)
        }
        return state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().search(state.filter.toLowerCase()) !== -1)
            .sort((a, b) => b.votes - a.votes)
    })

    return (
        <>
            <ul>
                {anecdotes.map( anecdote =>
                    <Anecdote
                        key= {anecdote.id }
                        anecdote={ anecdote }
                        handleClick={ () => {
                            dispatch(vote(anecdote.id))
                            dispatch(setNotification(`you voted '${anecdote.content}'`))
                            setTimeout(() => {
                                dispatch(clearNotification())
                            }, 5000)
                         }}
                    />
                )}
            </ul>
        </>
    )
}

export default AnecdoteList