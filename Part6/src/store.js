import { createStore, combineReducers, applyMiddleware } from 'redux'

/*redux-thunk, it is possible to define action creators so they return a function
 having the dispatch-method of redux-store as its parameter. 
 As a result one can make asynchronous action creators, which first wait for some operation to finish
 after which they dispatch the real action.*/
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'



const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

console.log(store.getState())
export default store