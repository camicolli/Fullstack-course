const { fromPairs } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
    // ...
  return (1)
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((n, {likes}) => n + likes, 0)
  return(sum)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((a,b) => a.likes > b.likes ? a : b)
  return(favorite)
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return 0
  }
  const authors = {} // Map into authors DICTIONARY the author and total number of likes
  return blogs.reduce((prev, cur) => {
      authors[cur.author] 
          ? authors[cur.author].blogs += 1
          : authors[cur.author] = {author: cur.author, blogs: 1}

      if(prev) {
          return prev.blogs > authors[cur.author].blogs ? prev : authors[cur.author]
      }
      else {
          return authors[cur.author]
    }
  }, undefined)
}


const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  }
  const authors = {} // Map into authors DICTIONARY the author and total number of likes
  return blogs.reduce((prev, cur) => {
      authors[cur.author] 
          ? authors[cur.author].likes += cur.likes
          : authors[cur.author] = {author: cur.author, likes: cur.likes}

      if(prev) {
          return prev.likes > authors[cur.author].likes ? prev : authors[cur.author]
      }
      else {
          return authors[cur.author]
    }
  }, undefined)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
