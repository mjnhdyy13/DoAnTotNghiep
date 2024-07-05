import axios from 'axios'
const authenApi = {
    signin(username, password) {
        const url = 'http://localhost:8080/api/v1/signin/customer'
        return axios.get(url, { params: { username, password } })
    },
    signup(username, password, email, fullName, phoneNo) {
        const url = 'http://localhost:8080/api/v1/signup'
        return axios.post(url, {
            username,
            password,
            email,
            fullName,
            phoneNo
        })
    },
    forgotPassword(email) {
        const url = `http://localhost:8080/api/v1/customer/forgot-password?email=${email}`
        return axios.get(url)
    },
    updateProfile(id, fullName, phoneNo, avatar, province, district, districtId, ward, address) {
        const url = 'http://localhost:8080/api/v1/update-profile'
        return axios.put(url, {
           id, fullName, phoneNo, avatar, province, district, districtId, ward, address
        })
    },
    updatePassword(id, password, newPassword) {
        const url = `http://localhost:8080/api/v1/customer/update-password?newPassword=${newPassword}`
        return axios.post(url, {
           id, password
        })
    }
}

export default authenApi