const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('Connection to Mongo database up!')
    console.log(result)
  })
  .catch(err => console.log(err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name required'],
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'Number required']
  }
})
//Mongoose unique validator filter to check that user names are unique
personSchema.plugin(uniqueValidator, { message: 'Name must be unique' } )

//Even though the _id property of Mongoose objects looks like a string, it is in fact an object.
//The toJSON method we defined transforms it into a string just to be safe.
//If we didn't make this change, it would cause more harm for us in the future once we start writing tests.
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)