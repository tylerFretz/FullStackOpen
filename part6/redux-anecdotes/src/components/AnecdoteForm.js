import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length > 0) {
            props.createAnecdote(content)
            props.setNotification(`Added ${content}`, 5, props.timerId)
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

const mapStateToProps = state => {
    return {
        timerId: state.notification.id
    }
}

export default connect(mapStateToProps, { createAnecdote, setNotification })(AnecdoteForm)