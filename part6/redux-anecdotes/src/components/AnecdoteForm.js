import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length > 0) {
            dispatch(createAnecdote(content))
            dispatch(setNotification(`Added ${content}`))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    return (
        <>
            <h3>Add new Anecdote</h3>
            <form onSubmit={ addAnecdote }>
                <input name='anecdote' />
                <button type='submit'>add</button>
            </form>
        </>
    )
}

export default AnecdoteForm