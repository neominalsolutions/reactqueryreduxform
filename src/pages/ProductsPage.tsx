import { useQuery } from 'react-query';
import React from 'react';
import { Product, ProductApi } from '../api/ProductApi';
import { Link, Outlet } from 'react-router-dom';

function ProductsPage() {
	const productApi = new ProductApi();

	const { data, isLoading, isFetching, isFetched, error, isError, isSuccess } =
		useQuery({
			cacheTime: 1000 * 60, // 1 dk için cache
			queryKey: ['PRODUCTS'], // Bu key değeri üzerinden cache invalidate edebilirz defaultda apidan gelen datayı 5 dk süre için cache, bunu değiştirebiliriz,
			queryFn: async () => {
				return await productApi.getProducts();
			},
			onSuccess: (data: Product[]) => {
				console.log('data', data);
			},
			onError: (error: any) => {
				console.log('veri çekme hatası meydana geldi');
			},
			//refetchInterval: 3000, // 3sn bu sayfadaki veri bayata refeleshle
		});

	if (isLoading) return <>... loading </>;

	if (isError)
		return (
			<>
				<p>Bir Hata Meydana geldi</p>
			</>
		);

	if (isFetched && isSuccess)
		return (
			<>
				
				{data.map((item: Product) => {
					return (
						<div key={item.ProductID}>
							{item.ProductName}
							<Link to={`/products/${item.ProductID}`}>Detayı</Link>
						</div>
					);
				})}
			</>
		);
	else return <></>;
}

export default ProductsPage;
