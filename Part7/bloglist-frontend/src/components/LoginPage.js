import React from 'react'
import { useHistory } from 'react-router-dom'
//Components
import LoginForm from './LoginForm'
import Notification from './Notification'
//Redux
import { useDispatch } from 'react-redux'
//Reducers
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (username,password) => {
    console.log('CAME TO HANDLE LOGIN ',username,password)
    try{
      await dispatch(login(username,password))
      history.push('/')
      dispatch(setNotification({ notification:`${username} logged in` }, 5))

    }catch(error){
      dispatch(setNotification({ error: 'Login failed' }, 5))
      console.log(error)
    }

  }

  return (
    <>
      <h3>Login</h3>
      <Notification />
      <LoginForm handleSubmit ={handleLogin} />
    </>
  )
}

export default LoginPage