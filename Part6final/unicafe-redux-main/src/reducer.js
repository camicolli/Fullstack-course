const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedGoodState = {
        ...state,
        good: state.good + 1
      }
      console.log('Good presser', state)
      return changedGoodState
    case 'OK':
      const changedOkState = {
        ...state,
        ok: state.ok + 1
      }
      console.log('ok presser', state)
      return changedOkState
    case 'BAD':
      const changedBasState = {
        ...state,
        bad: state.bad + 1
      }
      console.log('Bad presser', state)
      return changedBasState
    case 'ZERO':
      const ResetState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      console.log('Good presser', state)
      return ResetState
    default: 
      console.log('came to deafult')
      return state
  }
  
}

export default counterReducer