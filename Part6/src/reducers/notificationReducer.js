

const notificationReducer = (state = {text: '', timer: null}, action) => {
    /*console.log('notification state', state)
    console.log('Action', action)*/

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            if(state.timer !== null) {
                clearTimeout(state.timer)
            }
            return {text: action.data.text, timer: action.data.timer}

        case 'REMOVE_NOTIFICATION':
            return { text:'', timer:null}
        default:
            return state
    }
}

export const setNotification = (text, seconds) => {
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds*1000)
        
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: {
                text: text,
                timer: timer
            }})

    }
}
export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer