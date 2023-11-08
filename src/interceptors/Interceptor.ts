import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

// request succes durumunu yakalar
const onRequest = (
	config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
	console.info(`[request] [${JSON.stringify(config)}]`);

	const token = localStorage.getItem('token');
	console.log('token', token);

	if (token !== null) {
		// config.headers = config.headers.set('Authorization', `Bearer ${token}`);
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	console.log('config', config);

	return config;
};

// request error
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[request error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

// response durumlarını bu function yakalar
const onResponse = (response: AxiosResponse): AxiosResponse => {
	console.info(`[response] [${JSON.stringify(response)}]`);
	return response;
};

// response error
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[response error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

export function setupInterceptorsTo(
	axiosInstance: AxiosInstance
): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);
	return axiosInstance;
}
