import axios from 'axios'

export default {
	user: {
		login: (credentials) => axios.post('/api/auth', {credentials}).then(res => res.data),
		signup: (credentials) => axios.post('/api/signup', {credentials}),
		checkAuth: (user) => axios.post('/api/checkauth', {user}),
		upload: (data) => axios.post('/api/upload', {data}),
		addNewCollection: (data) => axios.post('/api/addnewcollection', {data})
	},
	photos: {
		showAll: () => axios.post('/allphotos'),
		like: (data) => axios.post('/api/likephoto', {data}),
		addComment: (data) => axios.post('/api/addcomment', {data}),
		getLikesComments: (photo_id) => axios.post('/api/getLikesAndComments', {photo_id}),
		addToCollection: (id) => axios.post('/api/addtocollection')
	},
	date: {
		getDate: () => axios.post('/api/getdate')
	}
}