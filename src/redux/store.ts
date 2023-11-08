import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './reducers/CartReducer';
import CounterReducer from './reducers/CounterReducer';
// ...

// uygulama içinde sadece 1 adet store oluyor
// tüm uygulama stateleri bu store içerisinde erişilebilir olur.

export const store = configureStore({
	reducer: {
		CounterState: CounterReducer,
		CartState: CartReducer, // CartReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
// component içinde ihtiyaç duyulan state bağlanacağız
export type RootDispatch = typeof store.dispatch; // component içindeki actionları tetikleyeceğiz
