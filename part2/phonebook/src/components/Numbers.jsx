const Number = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person =>
                <li key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </li>
            )}
        </ul>

    )
}
export default Number