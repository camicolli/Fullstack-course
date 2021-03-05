import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleaddAnec = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('in handleaddAnec and calling dispatch')
        dispatch(createAnecdote(content))
        
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