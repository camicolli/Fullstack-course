const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

describe('test GET method', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
      })
    test('blogs are returned as json', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log(result.body)
    })
    test('each blog has an id', async () => {
        const response = await api.get('/api/blogs')
        console.log(response.body)
        response.body.forEach(blog =>
            expect(blog.id).toBeDefined())
            
    })
})

describe('test POST method', () => {

    test('Post method adds blog to bloglist', async () => {
        const blog = {
            title: 'Testiblogi',
            author: 'Cami',
            url: 'http://jotainkivaa.fi',
            likes:50
        }
        const responseBefore = await api.get('/api/blogs')
        await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)
                .expect('Content-Type',/application\/json/)
        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.length).toBe(responseBefore.body.length +1)
        
        })
    test('Post method without likes registers 0 likes', async () => {
        const blog = {
            title: 'Testiblogi2',
            author: 'Cami',
            url: 'http://jotainhassua.fi'
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const savedblog = response.body[response.body.length-1].likes //last sent blog is the last blog in response.body
        console.log(savedblog)
        expect(savedblog).toEqual(0)
    
    })
    test('Post without title and url is not saved', async () => {
        const blog = {
            author: 'Cami',
            likes: 100
        }
        
        const responseBefore = await api.get('/api/blogs')
        await api
                .post('/api/blogs')
                .send(blog)
                .expect(400)
                .expect('Content-Type',/application\/json/)
        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.length).toBe(responseBefore.body.length)
    })

})
describe('DELETE a blog', () => {
    test('deletion with valid id results to 204 code', async () => {
        const beforeBlogs = await api.get('/api/blogs')
        const blogToDelete = beforeBlogs.body[0]
        console.log(blogToDelete)
        await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
        const afterBlogs = await api.get('/api/blogs')
        expect(afterBlogs.body.length).toBe(beforeBlogs.body.length-1)
    })

})




afterAll(() => {
  mongoose.connection.close()
})