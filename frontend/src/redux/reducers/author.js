const initialState = {
    id: '',
    name:''
}

const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTHOR':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default authorReducer
