const initialState = {
    id: '',
    name:''
}

const subCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBCATEGORY':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default subCategoryReducer
