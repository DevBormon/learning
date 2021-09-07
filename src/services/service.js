import { courses, login, register, logout, user, carts, payment, mycources, download } from '../config/apiEndpoints';
import axiosLearning from '../config/axiosLearning';
import axiosDownload from '../config/axiosDownload';

export const loginAPI = payload => axiosLearning.post(login, payload);
export const registerAPI = payload => axiosLearning.post(register, payload);
export const logoutAPI = () => axiosLearning.get(logout);
export const userDetails = () => axiosLearning.get(user);

export const myCourses = () => axiosLearning.get(mycources);

export const allCourses = () => axiosLearning.get(courses);
export const addCourses = payload => axiosLearning.post(courses, payload);

export const addNewCart = payload => axiosLearning.post(carts, payload);
export const allCarts = () => axiosLearning.get(carts);

export const removeCartAPI = id => axiosLearning.delete(`${carts}/${id}`);

export const paymentAPI = payload => axiosLearning.post(payment, payload);

export const downloadAPI = payload => axiosDownload.post(download, payload);

