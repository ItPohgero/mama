import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ConfigState = {
	loading?: boolean;
};

const initialState: ConfigState = {
	loading: false,
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		reset: () => initialState,
		changeLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const {
	changeLoading,
	reset,
} = configSlice.actions;
export default configSlice.reducer;
