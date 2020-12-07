import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const personsToShow = newFilter
  ? persons.filter(person => person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1)
  : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App