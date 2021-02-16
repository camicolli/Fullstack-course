require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
console.log("in config file")
console.log(`Port is ${PORT}`)
console.log(`MONGO is ${MONGODB_URI}`)
module.exports= {
    MONGODB_URI,
    PORT
}