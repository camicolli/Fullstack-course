import userService from '../services/users'

const userReducer = (state=[], action) => {

  switch (action.type) {
  case 'INITIALIZE_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const listOfUsers = await userService.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: listOfUsers
    })
  }
}

export default userReducer