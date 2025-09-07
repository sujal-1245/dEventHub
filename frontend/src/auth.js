export const saveAuth = (user) => {
// user is the login response containing token + user fields
localStorage.setItem('token', user.token)
localStorage.setItem('user', JSON.stringify({ _id: user._id, name: user.name, email: user.email }))
}


export const logout = () => {
localStorage.removeItem('token')
localStorage.removeItem('user')
window.location.href = '/login'
}


export const getUser = () => JSON.parse(localStorage.getItem('user') || 'null')


export const getToken = () => localStorage.getItem('token')