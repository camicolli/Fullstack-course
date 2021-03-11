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



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.login)
  console.log('USERS is',user)

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