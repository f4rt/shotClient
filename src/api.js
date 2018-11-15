import axios from 'axios'

export default {
	user: {
		login: (credentials) => axios.post('/api/auth', {credentials}).then(res => res.data),
		signup: (credentials) => axios.post('/api/signup', {credentials}),
		checkAuth: (user) => axios.post('/api/checkauth', {user}),
		upload: (data) => axios.post('/api/upload', {data})
	},
	photos: {
		showAll: () => axios.post('/allphotos'),
		like: (data) => axios.post('/api/likephoto', {data})
	}
}