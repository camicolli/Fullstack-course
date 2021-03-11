import React from 'react'
//import { useHistory } from 'react-router-dom'
//Components
import BlogForm from './BlogForm'
import Togglable from './Togglable'


//Redux
import { useDispatch, useSelector } from 'react-redux'
//Reducers
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'
import Notification from './Notification'



//The rest
import Blog from './Blog'

const MainPage = () => {


  const user = useSelector((state) => state.login)
  console.log('The user in Mainpage is',user) //it has values:token,username,name
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs are,' ,blogs)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  const handlelogout = () => {
    dispatch(logout())
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      if(!newBlog.title || !newBlog.author || !newBlog.url) {
        dispatch(setNotification({ error: 'You need to fill in all the fields. ' }, 5))
        return
      }
      console.log('in newBlog and user is',user, newBlog)
      dispatch(createBlog(newBlog, user))
      dispatch(setNotification({ notification: `Created a new blog titled: ${newBlog.title}` }, 5))

    }catch(error){
      dispatch(setNotification({ error: 'Something went wrong with creating a new blog.' }, 5))
      console.log(error)
    }
  }

  const handleLikeBlog = async (blog) => {
    console.log('trying to like a blog,', blog)
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      dispatch(likeBlog(updatedBlog.id,updatedBlog))
    }catch(error) {
      console.log('error in handleLikes',error)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      dispatch(removeBlog(blog))
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <Notification />
      <button onClick={handlelogout}>Logout</button>
      <h1>Create new blog</h1>
      <Togglable buttonLabel= 'create' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog}/>)}
    </>
  )
}

export default MainPage