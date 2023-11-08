// url

import HttpClient from '../network/HttpClient';

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

export class ProductApi extends HttpClient {
	getProducts() {
		// base c# super java,typescript
		return super
			.get(
				'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
			)
			.then((response: any) => {
				console.log('response', response);
				return response.data.value;
			});
	}

	getProductsId(id: number) {
		return super
			.get(
				`https://services.odata.org/northwind/northwind.svc/Products?$filter=ProductID eq ${id}&$format=json`
			)
			.then((response: any) => {
				console.log('response', response);
				return response.data.value[0];
			});
	}
}
