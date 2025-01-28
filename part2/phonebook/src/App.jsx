import { useState } from 'react';
import Number from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some(person => person.name === newName);
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

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
      <Number persons={persons} />
    </div>
  );
};

export default App;