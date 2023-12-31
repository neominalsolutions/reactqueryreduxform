import { useQuery } from 'react-query';
import React from 'react';
import { Product, ProductApi } from '../api/ProductApi';
import { Link, Outlet } from 'react-router-dom';
import { RootDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, addToCart } from '../redux/reducers/CartReducer';

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
	// client state değiştirme için useDispatch kullanılır
	const dispatch = useDispatch();
	// state bilgisine erişmek için useSelector kullanılır
	const successFullyAdded = useSelector(
		(state: RootState) => state.CartState.successfully
	);
	const onAddToCart = (item: Product) => {
		// redux reducer'a git
		const cartItem: CartItem = {
			quantity: 1,
			name: item.ProductName,
			id: item.ProductID,
			price: item.UnitPrice,
		};
		// redux böyle aksiyonun alınacağını bildir.
		dispatch(addToCart(cartItem));
	};

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
				{successFullyAdded ? <>Ürün Sepete Eklendi</> : <></>}
				{data.map((item: Product) => {
					return (
						<div key={item.ProductID}>
							İsim: {item.ProductName} Fiyat: {item.UnitPrice} Stock:{' '}
							{item.UnitsInStock}{' '}
							<Link to={`/products/${item.ProductID}`}>Detayı</Link>{' '}
							<button onClick={() => onAddToCart(item)}>Sepete Ekle</button>
						</div>
					);
				})}
			</>
		);
	else return <></>;
}

export default ProductsPage;
