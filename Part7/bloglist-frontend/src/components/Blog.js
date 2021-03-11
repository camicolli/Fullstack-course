import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('the blog is',blog)

  const [showDetails, setShowDetails] = useState(false)
  const switchShowDetails = () => {
    setShowDetails((currentstate) => !currentstate)
  }

  const handlelikeBlog = (event) => {
    event.preventDefault()
    console.log('In blog.js blog is,',blog)
    likeBlog(blog)
  }

  const showBlogs = () => {
    if (!showDetails) {
      return (
        <div style={blogStyle}>
          <ul className = 'blogDefault'>
            Title: {blog.title} Author: {blog.author}<button onClick={switchShowDetails}> Details</button>
          </ul>
        </div>
      )
    }
    return (
      <div style={blogStyle}>
        <ul className = 'blogDetails'>
          Title: {blog.title} Author: {blog.author} URL: {blog.url} Likes: {blog.likes} <button onClick= {handlelikeBlog}>Like</button>
          <button onClick={switchShowDetails}> Less details</button>
        </ul>
      </div>
    )
  }

  return (
    <div>
      {showBlogs()}
    </div>
  )
}

export default Blog