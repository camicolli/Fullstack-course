const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { requestLogger } = require('../utils/middleware')


usersRouter.get('/', async (request, response,next) => {
    console.log("HI")
    try {
    //const users = await User.find({})
        const users = await User.find({}).populate('blogs', {title: 1, author: 1,url: 1})
        response.json(users)
    }catch(error) {
        next(error)
    }
  })

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  /*if(!body.password || body.password <3){
      return response.status(400).json(
          {error: 'Password must be at least 3 characters.'}
      )
  }*/

  const saltRounds = 10
  console.log("In post and params are",saltRounds, body)

  const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
  console.log(passwordHash)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash:passwordHash,
    //blogs: body.blogs
  })
  try {
    const savedUser = await user.save()

    response.json(savedUser)
  }catch(error){
      next(error)
  }

})



module.exports = usersRouter