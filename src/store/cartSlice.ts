import type { Vape } from '@/types/vape';
import { loadCart } from '@/utils/cartStorage';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    items: Vape[];
}
const initialState: CartState = {
    items: loadCart(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Vape>) {
            const existing = state.items.find((i) => i.id === action.payload.id);
            
            if (existing) {
                if(existing.quantity < existing.stock){
                    existing.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            
        },
        removeOneFromCart(state, action: PayloadAction<number>) {
            const existing = state.items.find((i) => i.id === action.payload);
            if (!existing) return;
            if (existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
            
        },
        removeItem(state, action){
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeOneFromCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
