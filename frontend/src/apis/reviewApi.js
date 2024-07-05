import axios from 'axios'
const reviewApi = {
    addReview(comment, rating, productId, customerId) {
        const url = 'http://localhost:8080/api/v1/add-review'
        return axios.post(url, { comment, rating, product: { id: productId }, customer: { id: customerId } })
    },
    getReviewByProduct(id) {
        const url = `http://localhost:8080/api/v1/reviews-product/${id}`
        return axios.get(url)
    },
    getReviewByCustomer(id) {
        const url = `http://localhost:8080/api/v1/reviews-customer/${id}`
        return axios.get(url)
    },
    getReviewByCustomerAndProduct(customerId, productId) {
        const url = `http://localhost:8080/api/v1/review-customer-product?customerId=${customerId}&productId=${productId}`
        return axios.get(url)
    },
}
export default reviewApi