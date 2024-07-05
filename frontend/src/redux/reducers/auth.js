const initialState = {
    id: '',
    username: '',
    email: '',
    fullName: '',
    phoneNo: '',
    point: '',
    province:'',
    district:'',
    districtId: '',
    ward:'',
    address: '',
    avatar: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                ...action.payload
            }
        }

        case 'UPDATE_FULLNAME': {
            return {
                ...state,
                fullName: action?.payload?.fullName
            }
        }

        case 'UPDATE_AVATAR': {
            return {
                ...state,
                avatar: action?.payload
            }
        }

        case 'LOGOUT': {
            return {
                id: '',
                username: '',
                email: '',
                fullName: '',
                phoneNo: '',
                point: '',
                address: '',
                avatar: ''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
