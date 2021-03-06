import loginService from '../services/login'

//First check if there is a logged user saved in browser. if yes set that as the initialstate.
//otherwise initialstate = null
const getLoggedInUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
const initialState = getLoggedInUser ? getLoggedInUser : null

const loginReducer = (state = initialState, action) => {
  //console.log('LoginReducer state: ',state)
  //console.log('LoginReducer action: ',action)

  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state

  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer
