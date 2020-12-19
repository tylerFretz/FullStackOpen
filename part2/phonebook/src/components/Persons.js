import React from 'react';

const Persons = ({ persons, removePerson }) => {



    return (
      <>
        {persons.map(person => (
          <p key={person.id}>
            <span>
              {person.name} &nbsp;
            </span>
            <span>
              {person.number} &nbsp;
            </span>
            <span>
              <button onClick={() => removePerson(person)}>delete</button>
            </span>
          </p>
        ))}
      </>
    );
  };

export default Persons;