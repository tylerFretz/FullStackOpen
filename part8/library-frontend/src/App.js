import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSubscription, useApolloClient } from '@apollo/client'

import useAuthUser from './hooks/useAuthUser'
import useNotification from './hooks/useNotification'
import { BOOK_ADDED, ALL_BOOKS } from './queries/bookQueries'

import ModalSpinner from './components/ModalSpinner'
import Navigation from './components/Navigation'
import Notifications from './components/Notifications'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const { hasSyncAuth } = useAuthUser()
  const notificationHelper = useNotification()
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notificationHelper.add(`A new book has been added: ${addedBook.title}`, 'info')
      updateCacheWith(addedBook)
    }
  })


  if (!hasSyncAuth) 
    return <ModalSpinner />

  return (
    <div>
      <Navigation />
      <Notifications />
      <div>
        <Switch>
          <Route path='/' exact>
            <Authors />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/books' exact>
            <Books />
          </Route>
          <Route path='/new' exact>
            <BookForm />
          </Route>
          <Route path='/recommendations' exact>
            <Recommendations />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
