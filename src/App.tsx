import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import FormSample from './pages/FormSample';
import InterceptorSample from './pages/InterceptorSample';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartSummarySample from './pages/CartSummarySample';

const Layout = () => {
	return (
		<>
			<div style={{ padding: '1rem' }}>
				<nav>
					<Link to="/">Anasayfa</Link> <Link to="/forms">Forms</Link>{' '}
					<Link to="/interceptors">Interceptor Sample</Link>{' '}
					<Link to="/products">Products</Link>{' '}
					<Link to="/cartSummary">Sepet Detay</Link>{' '}
				</nav>
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
};
function App() {
	const routes = useRoutes([
		{
			path: '/',
			Component: Layout,
			children: [
				{ path: '/forms', Component: FormSample },
				{ path: '/interceptors', Component: InterceptorSample },
				{
					path: '/products',
					element: (
						<>
							<h1>Ürünlerimiz</h1>
							<Outlet />
						</>
					),
					children: [
						{
							path: '',
							Component: ProductsPage,
						},
						{
							path: ':id',
							Component: ProductDetailPage,
						},
					],
				},
				{
					path: '/cartSummary',
					Component: CartSummarySample,
				},
			],
		},
	]);

	return routes;
}

export default App;
