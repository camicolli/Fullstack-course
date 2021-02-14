const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//the dotenv library allows us to use the URI in .env file
require('dotenv').config()
const app = express()
app.use(express.static('build'))
app.use(express.json())
const Person = require('./models/person')
// eslint-disable-next-line no-undef
const PORT = process.env.PORT

morgan.token('person', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
})

app.get('/',(request,response) => {
  response.send('<h1>This works</h1>')
})

app.get('/api/persons' , (request,response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))

})

app.get('/info',(request, response) => {
  const date = new Date()
  Person.countDocuments({}).then(amount => {
    response
      .send(`<p>Phonebook has info for ${amount} people</p><p>${date}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(person)

    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response, next) => {
  console.log('Updating person')
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  //By default, the updatedPerson parameter of the event handler receives the original document without the modifications.
  // Added { new: true }parameter, which causes event handler to be called with modified document instead of the original.
  //By default Mongoose update validation is false. Need to set it true
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators:true, context: 'query' } )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//handler of requests with unknown endpoint. Has to be called just before errorhandler.

app.use(unknownEndpoint)

const  errorHandler = (error,request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// The errorhandler has to be the last loaded middleware. Has to be called after creating const.
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})