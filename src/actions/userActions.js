import api from '../api'

export const likePhoto = (data) => ({
	type: 'LIKE_PHOTO',
	data
});

export const newCollection = (data) => ({
	type: 'CREATE_NEW_COLLECTION',
	data
})

export const addPhoto = (data) => ({
	type: 'ADD_PHOTO_TO_COLLECTION',
	data
})

export const like = (data) => (dispatch) => {api.photos.like(data); dispatch(likePhoto(data))};
export const createCollection = (data) => (dispatch) => {api.user.addNewCollection(data); dispatch(newCollection(data))};
export const addToCollection = (data) => (dispatch) => {api.user.addToCollection(data); dispatch(addPhoto(data))};