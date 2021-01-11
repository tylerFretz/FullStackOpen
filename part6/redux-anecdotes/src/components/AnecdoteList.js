import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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


const AnecdoteList = (props) => {
    return (
        <>
            <ul>
                {props.anecdotes.map( anecdote =>
                    <Anecdote
                        key= {anecdote.id }
                        anecdote={ anecdote }
                        handleClick={ () => {
                            props.vote(anecdote)
                            props.setNotification(`you voted '${anecdote.content}'`, 5, props.timerId)
                         }}
                    />
                )}
            </ul>
        </>
    )
}

const mapStateToProps = (state) => {
    if ( state.filter === 'ALL' ) {
        return {
            anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
            timerId: state.notification.id
        }
    }

    return {
        anecdotes: state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().search(state.filter.toLowerCase()) !== -1)
            .sort((a, b) => b.votes - a.votes),
        timerId: state.notification.id
    }
}

const mapDispatchToProps = {
    vote,
    setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes