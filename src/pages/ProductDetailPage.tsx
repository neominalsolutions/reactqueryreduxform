import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { QueryClient, useQueries, useQuery } from 'react-query';
import { Product, ProductApi } from '../api/ProductApi';

function ProductDetailPage() {
	const productApi = new ProductApi();
	const queryClient = new QueryClient();

	// dynamic parametreleri okumamız
	// url'den gedlen parametreleri okumamızı sağlar
	// props değeri okumaz.
	let params = useParams();
	const navigate = useNavigate(); // ts dosyasında spa redirect, Link to componentin typescript versiyonu

	const { data, isSuccess, isLoading, refetch } = useQuery({
		queryKey: ['product-detail', params.id], // eğer id değeri bir sonraki istekde bir önceki id isteiğinde farklı bir değer olarak gönderilirse o zaman cache boz yeniden veri çek
		queryFn: async () => {
			return await productApi.getProductsId(Number(params.id));
		},
		onSuccess(data: Product) {
			console.log('data', data);
		},
	});

	console.log('params', params);

	if (isLoading) return <>... loading</>;

	if (isSuccess) {
		return (
			<div>
				Ürün İsimi : {data.ProductName}
				<br></br>
				Ürün Fiyat: {data.UnitPrice}
				<br></br>
				Ürün Stok : {data.UnitsInStock}
				<br></br>
				<button
					onClick={() => {
						const r = window.confirm('Sayfada kalmak ister misiniz?');
						if (r === false) {
							navigate('/products'); // net redirectToAction
						}
					}}
				>
					Navigate
				</button>
				<button
					onClick={() => {
						queryClient.invalidateQueries(['product-detail', params.id]);
						// refetch(); // manuel olarak yeniden data çeker.
					}}
				>
					Manuel olarak cache boz
				</button>
			</div>
		);
	} else return <></>;
}

export default ProductDetailPage;
