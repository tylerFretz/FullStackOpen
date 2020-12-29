import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNotificationClose = event => setNotification(null)


  useEffect(() => {
    phonebookService
      .getAll()
      .then( response => setPersons(response))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }, [notification])


  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      updateNumber(personObject)
      return
    }
    else { 
      phonebookService.create(personObject)
        .then(res => {
          console.log(res)
          setPersons(persons.concat(personObject))
          setNotification(
            {
              body: `Added ${personObject.name}`,
              type: 'info'
            }
          )
        })
        .catch(err => {
          console.log(err);
          setNotification(
            {
              body: `${err.response.data.error}`,
              type: 'error'
            }
          )
          console.log(err.response.data)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = person => {
    const result = window.confirm(`Delete ${person.name} ?`)

    result ?
    phonebookService.deleteContact(person.id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification(
            {
              body: `Information of '${person.name}' has been removed from server`,
              type: 'info'
            }
          )
      })
      .catch(err => {
        setPersons(persons.filter(p => p.id !== person.id))
          setNotification(
            {
              body: `Information of '${person.name}' has already been removed from server`,
              type: 'error'
            }
          )
          console.log(err);
      })
    : alert("The contact was not deleted")
  }

  const updateNumber = person => {
    const result = window.confirm(`${person.name} is already added to the phonebook, update the old number with a new one?`)

    const id = persons.filter(p => p.name === newName).map(p => p.id);

    result ?
    phonebookService.update(id, person)
      .then(res => {
        setPersons(persons.map(person => person.id !== id ? person : res))
        setNotification(
            {
              body: `${person.name}'s number was updated`,
              type: 'info'
            }
        )
      })
      .catch(err => {
        setPersons(persons.filter(p => p.id !== person.id))
        console.log(err)
        setNotification(
            {
              body: `${err.response.data.error}`,
              type: 'error'
            }
          )
          console.log(err.response.data);
      })
    : alert("The contact was not updated")
  }

  const personsToShow = newFilter
  ? persons.filter(person => person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
  : persons;

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} onClose={handleNotificationClose}/>

      <Filter value={newFilter} onChange={handleFilterChange}/>

      <h3>Add a new contact</h3>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App