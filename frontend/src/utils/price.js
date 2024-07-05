export function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)
}

export const sortByMaxPrice = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => b.price - a.price)
}
export const sortByMinPrice = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => a.price - b.price)
}
export const sortByMaxId = (originalArray) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray.sort((a, b) => b.id - a.id)
}
export const sortByMaxIdAndPriceRange = (originalArray, minPrice, maxPrice) => {
    if (!originalArray) return []
    const clonedArray = [...originalArray]
    return clonedArray
        .filter((item) => item.price >= minPrice && item.price <= maxPrice)
}
