/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

//First let's write the main blogreducer, then create exported functions that change the action.type

const blogReducer = (state = [], action ) => {

  console.log('blogreducer state is', state)
  console.log('blogreducer action is ',action)

  switch(action.type) {

  case 'INITIATE_BLOGS':
    return action.data

  case 'CREATE_BLOG':
    //Otherwise copy the previous state but add the new blog
    console.log('came to create blog')
    return [...state, action.data]

  case 'REMOVE_BLOG':
    const { id } = action.data
    return state.filter((blog) => blog.id !== id)

  case 'LIKE_BLOG':
    const likedblogid = action.data.id
    const likedBlog = state.find((blog) => blog.id === likedblogid)
    const updatedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
    return state.map((b) => b.id !== likedblogid ? b: updatedBlog)



  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('initialized blogs are',blogs)
    dispatch({
      type: 'INITIATE_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (data, user) => {
  return async (dispatch) => {
    const blog = await blogService.create(data)
    const newBlog = { ...blog, user: user }
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  const id = blog.id
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id }
    })
  }
}

export default blogReducer



