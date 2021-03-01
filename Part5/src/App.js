import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
//import { getByDisplayValue } from '@testing-library/react'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = (id,blogObject) => {
    console.log('likeBlog called')
    const likedblog = blogs.find((blog) => blog.id === blogObject.id)
    console.log('the likedblog is',likedblog)
    console.log('user is',likedblog.user.id)
    if(likedblog) {
      console.log('found blog ',likedblog)
      const updatedBlog = {
        ...likedblog,
        likes:likedblog.likes+1,
        userId: likedblog.user.id
      }

      try {
        blogService
          .update(id, updatedBlog)
          .then(returnedBlog => {
            setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
          })
      }
      catch (error) {
        console.log('error occured',error)
      }
    }
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Trying to logout user')
    window.localStorage.removeItem('loggedBlogeappUser')
    setUser(null)

  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to log in with ',username,password)
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      console.log('logging in with', username, password)
      window.localStorage.setItem(
        'loggedBlogeappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('problem with handleLogin')
      console.log(exception)
    }

  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />


  )

  const blogForm = () => (
    <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
      <BlogForm createBlog = {addBlog} />
    </Togglable>


  )

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
        </div>
      }
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
        )}
      </div>



    </div>
  )
}

export default App