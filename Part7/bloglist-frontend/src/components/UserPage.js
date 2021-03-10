import React from 'react'
import { useSelector } from 'react-redux'
//import { Link } from 'react-router-dom'

const UsersPage = () => {
  const users = useSelector((state) => state.users)
  return (
    <>
      <h1>Users</h1>
      {users.map((user) => {user.username})}

    </>
  )
}

export default UsersPage