export default function user(state = {}, action = {}) {
	switch(action.type) {
		case 'USER_LOGGED_IN':
			return action.user;

		case 'USER_LOGGED_OUT':
			return {};

		case 'CHECK_AUTH':
			return action.user

		case 'LIKE_PHOTO':
			return {
				...state,
				liked_photos: [...state.liked_photos, action.data.photo_id]
			};

		case 'CREATE_NEW_COLLECTION':
			return {
				...state,
				collections: [...state.collections, {collection_name: action.data.collection_name, collection_photos: []}]
			};

		case 'ADD_PHOTO_TO_COLLECTION':
			let arr;
			for (let i = 0; i < state.collections.length; i++) {
				arr = state.collections;
				if (arr[i].collection_name === action.data.collection_name) {
					arr[i].collection_photos.push(action.data.photo_id);
					arr[i].last_photo_url = action.data.last_photo_url;
					break;
				}
			}
			return {
				...state,
				collections: arr
			}
			
		default:
			return state;
	}
}