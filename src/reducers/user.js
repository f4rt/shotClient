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
			}
		default:
			return state;
	}
}