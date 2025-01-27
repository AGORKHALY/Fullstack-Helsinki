import { useState } from 'react'
import Number from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState(
    [
      {
        name: 'Arto Hellas',
        number: '040-1234567'
      }
    ]
  )
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isDuplicate = persons.some(person => person.name === newName);
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Number key={person.name} person={person} />
        )}
      </ul>

    </div>
  )
}

export default App