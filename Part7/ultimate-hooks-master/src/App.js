 
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const cancelingToken = axios.CancelToken
    const source = cancelingToken.source()

    const initialize = async () => {
      console.log('in initialization...')
      try {
        const response = await axios.get(baseUrl, { cancelingToken: source.token })
        setResources(response.data)
        console.log('initialization success!')

      }
      catch (error) {
        console.log('initialization failed', error)
        setResources([])
      }
    }

    initialize()
    return () => source.cancel()

  }, [baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)

      setResources((r) => r.concat(response.data));
    } catch (error) {
      console.error(error)
    }
  }


  const service = {
    create
  }

  return [resources, service]
}


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  //Event handlers for the button clicks to submit form
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((note) => (
	      <p key={note.id}>
          {note.content}
        </p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((person) => (
	      <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )

 
}

export default App