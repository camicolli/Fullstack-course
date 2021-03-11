import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  //If no messages, return null
  if(!message) {
    console.log('no message found')
    return null
  }
  //If there is a notification show it, if not show the error message
  return (
    <div>
      {message.notification ? message.notification : message.error}
    </div>
  )
}

export default Notification