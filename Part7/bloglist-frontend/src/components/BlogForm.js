import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)


  const addBlog = (event) => {

    console.log(`Title is ${title}, author is ${author}, url is ${url}`)
    event.preventDefault()

    createBlog({
      title:title,
      author:author,
      url:url,
      likes:0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <form onSubmit={addBlog}>
        <div>Title:
          <input
            id = 'title'
            value = {title}
            onChange = {handleTitleChange}
          />
        </div>
        <div>Author:
          <input
            id = 'author'
            value = {author}
            onChange = {handleAuthorChange}
          />
        </div>
        <div>Url:
          <input
            id = 'url'
            value = {url}
            onChange = {handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>

  )
}

export default BlogForm