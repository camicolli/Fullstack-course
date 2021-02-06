import React from 'react'

const Person = ({person, onDelete}) => <p>{person.name} {person.number} <button onClick={() => onDelete(person)}>Delete</button></p>




export default Person