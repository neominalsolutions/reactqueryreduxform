import axios, { AxiosInstance } from 'axios';
import { setupInterceptorsTo } from '../interceptors/Interceptor';

export default class HttpClient {
	private axiosRef!: AxiosInstance;
	private controller!: AbortController;

	constructor() {
		const axiosInstance = axios.create();
		this.axiosRef = setupInterceptorsTo(axiosInstance);
		this.controller = new AbortController();
	}

	protected get(url: string) {
		return this.axiosRef
			.get(url, { signal: this.controller.signal })
			.then((response: any) => {
				console.log('response', response);
				return response;
			})
			.catch(() => {
				this.controller.abort();
			});
	}

	protected post(url: string, data: any) {
		return this.axiosRef.post(url, data, { signal: this.controller.signal });
	}
}
