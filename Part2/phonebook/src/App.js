import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


//start the json server with: json-server --watch db.json

const Persons = ({persons, filter, onDelete}) => {
  const filterbyName = (person) => (
    person.name.toLowerCase().includes(
      filter.toLowerCase()
    )
  )
  return (
    <ul> {persons.filter(filterbyName).map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
    </ul> 
  )

}
const App = () => {

  //UseStates
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  //Event handlers
  const handleNameInputChange = (event) => setNewName(event.target.value)
  const handleNumberInputChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        console.log(initialPersons)
        setPersons(initialPersons)
      }).catch(err => console.log(err))
  },[])

  const updatePerson = (p) => {
    const confirmed = window.confirm(`${p.name} is already added to phonebook, replace the old number with the new one?`)
    if (confirmed) {
      console.log(`updating ${p.name}`)
      const updatedPerson = { ...p, number: newNumber}
      personService
        .update(p.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person: returnedPerson))
          setMessage(`Updated ${p.name}`)
          setIsError(false)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }
 

  //Add User
  const addPerson = (event) => {

    event.preventDefault()
    if (newName === '' || newNumber === ''){
      console.log("Doing nothing")
      return
    }
    if (checkUserList() === true) {
      const p = persons.find(person => person.name === newName)
      console.log(p)
      if (p.number !== newNumber) {
        updatePerson(p)

      }
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    //Create a new person object with the user input data
    else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length +1,
      }
      //Send the new person to the server via personServicd, and add them via response data to the list setPersons
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log("new user added",person)
          setMessage(`Added ${person.name}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)


        }).catch(err => console.log(err))


    }

  }
  //Validate new user name
  const checkUserList = () => {
    
    const list = persons.map(person => person.name)
    return (
      list.includes(newName)
    )
  }

  const removePerson = person => {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (confirmed) {
      personService
        .remove(person.id)
        .then(() => {  //Create new array, where we add all people from the old array except the one we removed from db.json
          setPersons(persons.filter(p => p.id !== person.id))
          setIsError(false)
          setMessage(
            `Deleted ${person.name} from server`
          )
          setTimeout(() => {
            setMessage(null)
          },5000)
        }).catch(err => {
          setIsError(true)
          setMessage(
            `Information of ${person.name} has already been deleted from the server`
          )
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add new User</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
       handleNameInputChange={handleNameInputChange} handleNumberInputChange={handleNumberInputChange}/>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filter={filter} onDelete={removePerson}/>
      </div>
    </div>
  )
}

export default App