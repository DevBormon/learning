import { combineReducers } from 'redux';
import cources from './cources';
import auth from './auth';
import carts from './carts';

const rooot = combineReducers({
	cources,
	auth,
	carts,
});

export default rooot;
