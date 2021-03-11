
const notificationReducer = (state = { notification: null }, action) => {
  console.log('notificationReducer state: ',state)
  console.log('notificationReducer action: ',action)

  switch (action.type) {
  case 'SET_NOTIFICATION':
    //clearTimeout(state.timer)
    return action.data.message
  case  'REMOVE_NOTIFICATION':
    return { notification: null }
  default:
    return state
  }
}

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICAITON',
      data: {
        message,
        timer: setTimeout(() => {
          dispatch(removeNotification())
        }, timer * 1000) //changing seconds to milliseconds for the setTimeout function
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer