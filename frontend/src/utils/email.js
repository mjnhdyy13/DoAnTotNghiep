export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  return emailPattern.test(email)
}