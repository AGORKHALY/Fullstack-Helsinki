import { useState } from 'react';
import { useEffect } from 'react';
import Number from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import noteService from './services/note';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const personsData = () => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }

  useEffect(personsData, []);

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some(person => person.name === newName && person.number === newNumber);
    const isExisting = persons.some(person => person.name === newName && person.number !== newNumber);

    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    else if (isExisting) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        noteService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          });
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Do you really want to delete ${name}?`);
    if (confirmDelete) {
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);

    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
    setPersons(filteredPersons)
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterQuery={filterQuery} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Number persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;