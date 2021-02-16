//const express = require('express')
//const cors = require('cors')
//require('dotenv').config()
const app = require('./App')
const http = require('http')
const config = require('./utils/config')
//const logger = require('./utils/logger')
const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})