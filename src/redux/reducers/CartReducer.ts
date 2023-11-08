// UseReducer daki reducer function veya context api daki Provider yapısan benzetebiliriz.

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Cart = {
	items: CartItem[];
	total: number;
};

export type CartItem = {
	quantity: number;
	id: number;
	name: string;
	price: number;
};

export type CartState = {
	cart: Cart;
	successfully?: boolean; // eklendiğinde başarı olduğu durumda ki mesajı ekranda göstemek için bir durum uyguladı
};

const intialState: CartState = {
	cart: { items: [], total: 0 },
	successfully: false,
}; // başlangıç client state

const calculateCartTotal = (cartItems: CartItem[]) => {
	let total = 0;
	cartItems.forEach((item) => {
		total += item.quantity * item.price;
	});

	return total;
};

const CartSlice = createSlice({
	name: 'CART',
	initialState: intialState,
	reducers: {
		// addToCart client state yönetimi
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			state.cart.items = [...state.cart.items, action.payload];
			state.successfully = true;

			state.cart.total = calculateCartTotal(state.cart.items);
		}, // removeFromCart
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: number }>
		) => {
			const filteredItems = state.cart.items.filter(
				(x) => x.id !== action.payload.id
			);
			state.cart.items = [...filteredItems];
		},
	},
});

export const { addToCart, removeFromCart } = CartSlice.actions; // action Export
const CartReducer = CartSlice.reducer; // reducer Export store dosyası reducer ile çalışsın diye
export default CartReducer;
