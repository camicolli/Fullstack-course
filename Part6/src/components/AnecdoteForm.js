import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleaddAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('CONTENT is',content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Created anecdote ${content}`, 5))
        
    }
    return (
        <>
    <h2>create new</h2>
    <form onSubmit={handleaddAnec}>
        <div><input name='anecdote' /></div>
        <button>create</button>
    </form>
    </>
    )

}

export default AnecdoteForm