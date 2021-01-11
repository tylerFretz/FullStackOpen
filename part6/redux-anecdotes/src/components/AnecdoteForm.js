import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import api from '../services/api'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length > 0) {
            const newAnecdote = await api.createNew(content)
            dispatch(createAnecdote(newAnecdote))
            dispatch(setNotification(`Added ${content}`))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }

    return (
        <>
            <form onSubmit={ addAnecdote }>
                <input name='anecdote' />
                <button type='submit'>add</button>
            </form>
        </>
    )
}

export default AnecdoteForm