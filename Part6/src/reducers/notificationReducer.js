

const notificationReducer = (state = {text: ''}, action) => {
    console.log('notification state', state)
    console.log('Action', action)

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            console.log('test notification')
            return {text: action.data.text}

        case 'REMOVE_NOTIFICATION':
            return { text:''}
        default:
            console.log('came to default')
            return state
    }
}

export const newNotification = (text) => {
    console.log('new notifiaction called',text)
    return (dispatch) => {
        dispatch(setNotification(text))
        setTimeout(() => {
            dispatch(removeNotification())
        },5000)
    }
}

export const setNotification = (text) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: {text: text}
    }
}
export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer