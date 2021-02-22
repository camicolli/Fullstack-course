
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response, next) => {
    try {
      const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
      response.json(blogs)
    }
    catch(error){
      next(error)
    }
  })
  
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  console.log("here", token)
  //The validity of the token is checked with jwt.verify. 
  //The method also decodes the token, or returns the Object which the token was based on
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

 // const decodedToken = jwt.verify(token, process.env.SECRET)
 // if (!token || !decodedToken.id) {
 //   return response.status(401).json({ error: 'token missing or invalid' })
 // }
    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })


    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
    }
    catch(error) {
      next(error)
    }
  })

blogRouter.delete('/:id', async (request,response, next) => {
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!request || !decodedToken) {
    return response.status(401).json( { error: 'token missing or invalid ' })
  }

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json( { error: 'permission denied ' })
  }
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  catch(error){
    next(error)
  }

}) 

blogRouter.put('/:id', async (request,response, next) => {
  const body = request.body
  
  const user = await User.findById(body.userId)

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }
  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      {new: true,runValidators: true, context: 'query'})
      .populate('user', {username: 1, name: 1})
    response.json(blog)
  }catch(error){
    next(error)
  }
})
  
module.exports = blogRouter