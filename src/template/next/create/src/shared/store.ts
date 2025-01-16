import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./slice/config";
export const store = configureStore({
	reducer: {
		configSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
