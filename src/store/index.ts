import { configureStore } from "@reduxjs/toolkit";
import vapeSlice from "./vapeSlice";
import cartSlice from "./cartSlice";
export const store = configureStore({
    reducer: {
        vapes: vapeSlice,
        cart: cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;