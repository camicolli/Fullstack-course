import React from 'react'
//Components
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Reducers
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
//The rest
import Blog from './Blog'

const MainPage = () => {

  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      if(!newBlog.title || !newBlog.author || !newBlog.url) {
        dispatch(setNotification({ error: 'You need to fill in all the fields. ' }, 5))
        return
      }
      dispatch(createBlog(newBlog, user))
      dispatch(setNotification({ notification: `Created a new blog titled: ${newBlog.title}` }, 5))

    }catch(error){
      dispatch(setNotification({ error: 'Something went wrong with creating a new blog.' }, 5))
      console.log(error)
    }
  }

  return (
    <>
      <Notification />
      <h1>Create new blog</h1>
      <Togglable buttonLabel= 'create' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} />)}
    </>
  )
}

export default MainPage