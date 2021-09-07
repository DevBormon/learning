import axios from 'axios';
// import Progress from 'react-progress-2';
import { toast } from 'react-toastify';

import { BASE_URL } from './apiEndpoints';


const axiosLearning = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});



axiosLearning.interceptors.request.use(
	request => {
		// console.log('REQUEST', request);
		const token = localStorage.getItem('TOKEN_LEARNING');
		if (token) request.headers['Authorization'] = `Bearer ${token}`;
		return request;
	},
	error => {
		// console.error('REQUEST ERROR', error);
		return Promise.reject(error);
	}
);

axiosLearning.interceptors.response.use(
	response => {
		// console.log('RESPONSE', response.data.data);
		if (response.data.msg !== '') {
			toast.dark(response.data.msg);
		}

		return Promise.resolve(response.data.data);
	},
	error => {
		// console.log('ERROR', error.response.data.message);
		if (typeof error.response.data.message != 'undefined') {
			toast.dark('Login please');
		}
		if (error.response.status === 413) {
			toast.dark('File size to large');

		} else {

			toast.dark(error.response.data.msg);

			Object.keys(error.response.data.data).forEach((key, i) => {
				toast.dark(error.response.data.data[key][0]);
			});
		}

		// error.response.data.data.forEach((value, i) => {
		// 	toast.dark(value);
		// });

		return Promise.reject(error.response.data.data);
	}
);

export default axiosLearning;
