import axios from 'axios';

import { BASE_URL } from './apiEndpoints';


const axiosDownload = axios.create({
    baseURL: BASE_URL,
    responseType: 'blob',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});



axiosDownload.interceptors.request.use(
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

axiosDownload.interceptors.response.use(
    response => {
        let d = new Date();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'corses_' + d.getTime());
        document.body.appendChild(link);
        link.click();

        return Promise.resolve(response.data.data);
    },
    error => {
        // console.log('ERROR', error.response.data.data);
        return Promise.reject(error.response.data.data);
    }
);

export default axiosDownload;
