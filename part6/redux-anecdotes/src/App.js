import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import api from './services/api'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    api
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h3>Add new Anecdote</h3>
      <AnecdoteForm />
    </>
  )
}

export default App