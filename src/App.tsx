import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import FormSample from './pages/FormSample';

const Layout = () => {
	return (
		<>
			<div style={{ padding: '1rem' }}>
				<nav>
					<Link to="/">Anasayfa</Link> <Link to="/forms">Forms</Link>
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
			children: [{ path: '/forms', Component: FormSample }],
		},
	]);

	return routes;
}

export default App;
