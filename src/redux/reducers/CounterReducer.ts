import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CounterState = {
	count: number;
};

const initial: CounterState = { count: 0 };

const CounterSlice = createSlice({
	name: 'COUNTER',
	initialState: initial,
	reducers: {
		increase: (state: CounterState, action: PayloadAction) => {
			state.count = state.count + 1;
		},
	},
});

export const { increase } = CounterSlice.actions; // action Export
const CounterReducer = CounterSlice.reducer; // reducer Export store dosyası reducer ile çalışsın diye
export default CounterReducer;
