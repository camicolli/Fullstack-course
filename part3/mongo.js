/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://cocacoca:${password}@cluster0.6tfkr.mongodb.net/phonebook?retryWrites=true&w=majority`
console.log('trying to connect')

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .catch(err => console.log(err.reason))
console.log(mongoose.connection.readyState)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


//Check if process was called without user parameters. If so print the phonebook
if (process.argv.length === 3) {
  Person
    .find({})
    .then((result) => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}
//Check if process was called with person's name and number attached. If so, add them to the Person Collection in Phonebook
if (process.argv.length === 5) {
  console.log('Made it to ADD')
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(person => {
    console.log(`Added ${person.name} ${person.number} to phonebook!`)
    mongoose.connection.close()
  }).catch(error => console.log(error))
}



