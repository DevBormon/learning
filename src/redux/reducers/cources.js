import { ADD_COURSES, REMOVE_COURSES } from '../constants/action-types';

const cources = (state = [], action) => {
	switch (action.type) {
		case ADD_COURSES:
			return action.payload;

		case REMOVE_COURSES:
			return [];

		default:
			return state;
	}
};

export default cources;
