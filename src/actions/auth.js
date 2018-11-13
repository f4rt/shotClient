import api from '../api'

export const logIn = (user) => ({
	type: 'USER_LOGGED_IN',
	user
});

export const logOut = () => ({
	type: 'USER_LOGGED_OUT'
});

export const login = (credentials) => (dispatch) => api.user.login(credentials).then(user => {localStorage.setItem('User', JSON.stringify(user)); dispatch(logIn(user))});
export const logout = () => (dispatch) => {localStorage.removeItem('User'); dispatch(logOut())};