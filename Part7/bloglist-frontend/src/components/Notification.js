import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = useSelector((state) => state.notification)

  //If no messages, return null
  if(!message) {
    return null
  }
  //If there is a notification show it, if not show the error message
  return (
    <div style={style}>
      {message.notification}
    </div>
  )
}

export default Notification