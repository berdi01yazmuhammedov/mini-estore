import { configureStore } from "@reduxjs/toolkit";
import vapeSlice from "./vapeSlice";
export const store = configureStore({
    reducer: {
        vapes: vapeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;