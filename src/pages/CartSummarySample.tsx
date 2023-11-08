import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItem } from '../redux/reducers/CartReducer';

function CartSummarySample() {
	const cart = useSelector((state: RootState) => state.CartState.cart);
	const count = useSelector((state: RootState) => state.CounterState.count);

	return (
		<div>
			Sayac: {count}
			{cart.items.map((item: CartItem) => {
				return (
					<div key={item.id}>
						{' '}
						{item.quantity} x {item.name}= {item.quantity * item.price}
					</div>
				);
			})}
			<div>Sepet Toplam Tutar : {cart.total} TL</div>
		</div>
	);
}

export default CartSummarySample;
