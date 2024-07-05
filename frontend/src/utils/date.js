export function getCurrentTime() {
    const currentTime = new Date()
    const offsetMinutes = currentTime.getTimezoneOffset()
    const offsetHours = padZero(Math.abs(offsetMinutes / 60))
    const offsetSign = offsetMinutes >= 0 ? '-' : '+'
    const offsetString = `${offsetSign}${offsetHours}:00`

    return currentTime.toISOString().replace('Z', offsetString)
}

function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`
}
