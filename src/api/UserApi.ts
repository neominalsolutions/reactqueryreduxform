import HttpClient from '../network/HttpClient';
// import {baseUrl} from './env.ts';

export default class UserApi extends HttpClient {
	private url: string;

	constructor(url: string) {
		super();
		this.url = url;
	}

	getUser() {
		return super.get(this.url);
	}

	createUser(user: any) {
		return super.post(this.url, user);
	}
}
