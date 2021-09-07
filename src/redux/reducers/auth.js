import { ADD_TOKEN, REMOVE_TOKEN } from '../constants/action-types';

const initialState = {
	url: 'http://192.168.43.227:8000/api/',
	autoLogin: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	user: null,
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOKEN:
			return {
				...state,
				autoLogin: true,
				headers: {
					...state.headers,
					Authorization: 'Bearer ' + action.payload.token,
				},
				user: action.payload.user,
			};
		case REMOVE_TOKEN:
			return {
				...state,
				autoLogin: false,
				headers: {
					...state.headers,
					Authorization: undefined,
				},
				user: null,
			};
		default:
			return state;
	}
};

export default auth;
