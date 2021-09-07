import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, ADD_COURSES, REMOVE_COURSES, ADD_TOKEN, REMOVE_TOKEN } from '../constants/action-types';

import { allCourses, addCourses, loginAPI, registerAPI, logoutAPI, userDetails, addNewCart, allCarts, removeCartAPI, paymentAPI } from '../../services/service';

export const setCarts = payload => {
	return {
		type: ADD_TO_CART,
		payload,
	};
};

export const updateCarts = payload => {
	return {
		type: REMOVE_FROM_CART,
		payload,
	};
};

export const deleteCarts = () => {
	return {
		type: EMPTY_CART,
	};
};

export const addToken = payload => {
	localStorage.setItem('TOKEN_LEARNING', payload.token);

	return {
		type: ADD_TOKEN,
		payload,
	};
};

export const removeToken = () => {
	localStorage.removeItem('TOKEN_LEARNING');
	return {
		type: REMOVE_TOKEN,
	};
};


export const saveCourses = payload => {
	return {
		type: ADD_COURSES,
		payload,
	};
};

export const removeCourses = () => {
	return {
		type: REMOVE_COURSES,
	};
};



export const register = payload => {
	return async dispatch => {
		try {
			const res = await registerAPI(payload);

			dispatch(addToken({ token: res.token, user: res.user }));
		} catch (err) {
			console.log(err);
		}
	};
};
export const login = payload => {
	return async dispatch => {
		try {
			const res = await loginAPI(payload);

			dispatch(addToken({ token: res.token, user: res.user }));
		} catch (err) {
			console.log(err);
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {
			let res = null;
			res = await logoutAPI();
			if (res !== null) {
				dispatch(removeToken());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getCourses = () => {
	return async dispatch => {
		try {
			let res = null;
			res = await allCourses();
			if (res !== null) {
				// console.log(res);
				dispatch(saveCourses(res));
			}
		} catch (err) {
			console.log(err);
			dispatch(removeCourses());
		}
	};
};

export const setCourses = payload => {
	return async dispatch => {
		try {
			let res = await addCourses(payload);
			if (res !== null) {
				dispatch(getCourses());
			}
		} catch (err) {
			console.log(err);
		}
	};
}

export const authCheckState = () => {
	return async dispatch => {
		const token = localStorage.getItem('TOKEN_LEARNING');
		if (token !== null) {
			try {
				const data = await userDetails();
				// console.log('USER DATA', data.user);
				// dispatch(removeToken());
				dispatch(addToken({ token, user: data.user }));
			} catch (err) {
				console.log(err);
				dispatch(removeToken());
			}
		}
	};
};

export const getCarts = () => {
	return async dispatch => {
		try {
			let res = await allCarts();
			if (Object.keys(res).length > 0) {
				Object.keys(res).forEach((key, i) => {
					dispatch(setCarts({ id: res[key].id, name: res[key].name, image: res[key].image, price: res[key].price }));
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const addCart = payload => {
	return async dispatch => {
		try {
			let data = new FormData();
			data.append('id', payload[0].id);
			let res = await addNewCart(data);
			dispatch(setCarts({ id: res.id, name: res.name, image: res.image, price: res.price }));
		} catch (err) {
			console.log(err);
		}
	};
};

export const removeCart = id => {
	return async dispatch => {
		try {
			let res = await removeCartAPI(id);
			dispatch(updateCarts({ id: res }));
		} catch (err) {
			console.log(err);
		}
	};
};

export const payment = payload => {
	// console.log('PAYLOAD', payload);
	return async dispatch => {
		try {
			let res = await paymentAPI(payload);

			console.log('CART ADD RESPONS', res);
			dispatch(deleteCarts());
		} catch (err) {
			console.log(err);
		}
	};
};


