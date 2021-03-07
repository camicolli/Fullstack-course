import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'INIT_ANEC':
      return action.data

    case 'VOTE':
      
      const changedAnec = action.data.anecdote
      return state
      .map(a => a.id !== changedAnec.id ? a : changedAnec)
      .sort((a1,a2) => a2.votes - a1.votes)

    case 'ADD':
      return state.concat(action.data)

    default:
      return state
  }
}

export const vote = (id) => {
  //console.log('vote called')
  return async dispatch => {
    const anec = await anecdoteService.getSingle(id)

    const changedAnec = {
      ...anec, votes: anec.votes + 1
    }

    await anecdoteService.update(changedAnec)

    dispatch({
      type: 'VOTE',
      data: { anecdote: changedAnec}
    })
  }
}

//first an asynchronous operation is executed,
//after which the action changing the state of the store is dispatched.
export const createAnecdote = (anecdote) => {
  console.log('createAnecdote called', anecdote)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log('anecdotes!!!',anecdotes)
    console.log('anecdote type is', anecdotes===Array)
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer