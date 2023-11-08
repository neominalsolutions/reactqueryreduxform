import React, { useEffect } from 'react';
import { setupInterceptorsTo } from '../interceptors/Interceptor';
import axios from 'axios';
import UserApi from '../api/UserApi';

function InterceptorSample() {
	const axiosInstance = axios.create();
	const axiosRef = setupInterceptorsTo(axiosInstance);

	const userApi = new UserApi('https://jsonplaceholder.typicode.com/users');

	useEffect(() => {
		userApi.getUser().then((response: any) => {
			console.log('data', response.data);
		});

		// axiosRef
		// 	.get('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => {
		// 		console.log('data', response.data);
		// 	});
	}, []);

	return <div>InterceptorSample</div>;
}

export default InterceptorSample;
