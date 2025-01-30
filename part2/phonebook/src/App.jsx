import { useState, useEffect } from 'react';
import Number from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import noteService from './services/note';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        showNotification('Failed to fetch contacts', 'error');
      });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ text: message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        noteService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number`);
          })
          .catch(error => {
            showNotification(`Failed to update ${newName}: ${error.message}`, 'error');
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      noteService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`);
        })
        .catch(error => {
          showNotification(`Failed to add ${newName}: ${error.message}`, 'error');
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
          showNotification(`Deleted ${name}`);
        })
        .catch(error => {
          showNotification(`Failed to delete ${name}: ${error.message}`, 'error');
        });
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  // Filtered list should be derived dynamically, not by modifying state
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterQuery={filterQuery} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Number persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
