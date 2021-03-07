import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

   // const dispatch = useDispatch()

    const handleaddAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('CONTENT is',content)
        props.createAnecdote(content)
        props.setNotification(`Created anecdote ${content}`, 5)
        
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

const mapDispatcToPrps = {
    createAnecdote, setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatcToPrps)(AnecdoteForm)

export default ConnectedAnecdoteForm