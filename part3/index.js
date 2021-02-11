const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.statis('build'))
app.use(express.json())





morgan.token('person', req => {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 1
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 2
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 3
      },
      {
        "name": "Moi testi",
        "number": "12345",
        "id": 4
      },
      {
        "name": "Testi kaksi",
        "number": "123",
        "id": 5
      }
]
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'Content missing' 
        })
    }
    const alreadyExists = persons.find(person => person.name === body.name)
    console.log(alreadyExists)
    if (alreadyExists){
        return response.status(400).json({
            error: 'Name must be unique.'
        })
    }
    
      const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }
    
      persons = persons.concat(person)
    
      response.json(person)
    })
  
app.get('/',(request,response) => {
    response.send('<h1>This works</h1>')
})

app.get('/api/persons' , (request,response) => {
    response.json(persons)
})

app.get('/info',(request, response) => {
    const date = new Date()
    const amount = persons.length
    response.send(`<p>Phonebook has info for ${amount} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})