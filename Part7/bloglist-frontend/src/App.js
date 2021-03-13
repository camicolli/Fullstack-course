import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
//Services
import blogService from './services/blogs'
//Components
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
//Reducers
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.login)

  useEffect(() => {
    const token = user ? user.token: null
    blogService.setToken(token)
  }, [user])



  return (
    <div>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route exact path= '/' render= {() => user ? <MainPage /> : <Redirect to= '/login' />} />
      </Switch>
    </div>
  )
}

export default App