const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(body)
  const user = await User.findOne({ username: body.username })
  console.log("USER is:", user)
  next("User is at the moment", user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
//If password is correct token is created with jwt.sign. 
//Token contains username&user id in a digitally signed form.
//The token has been digitally signed using a string from the environment variable SECRET as the secret. 
//The digital signature ensures that only parties who know the secret can generate a valid token. 
//The value for the environment variable must be set in the .env file.
  const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60})
  console.log("TOKEN IS ", token)
//token expires after an hour
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter