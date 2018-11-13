import axios from 'axios'

export default {
	user: {
		login: (credentials) => axios.post('/api/auth', {credentials}).then(res => res.data),
		signup: (credentials) => axios.post('/api/signup', {credentials}),
		upload: (data) => axios.post('api/upload', {data})
	},
	photos: {
		all: () => axios.post('/allphotos')
	}
}