import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
//Services
import blogService from './services/blogs'
//Components
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
//Reducers
import { initializeBlogs } from './reducers/blogReducer'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs)
  }, [dispatch])

  const user = useSelector((state) => state.login)

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON) {
      console.log('loggedUserJSON is', loggedUserJSON)
      const user = (loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)

  }, [user])

  return (
    <div>
      <Link to='/'>
        Blog App
      </Link>
      <Switch>
        <Route path='/login' exaxt component={LoginPage} />
        <Route path= '/' render= {() => user ? <MainPage /> : <Redirect to= '/login' />} />
      </Switch>
    </div>
  )
}

export default App