const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/bloglist')
const mongoose = require('mongoose')

//const mongoUrl = "mongodb+srv://cocacoca:Meelis1993@bloglist.qoggu.mongodb.net/database?retryWrites=true&w=majority"
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log("Connected!"))
  .catch(error => console.log(error.message))

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use('/',blogRouter)
module.exports = app