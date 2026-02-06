import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Vape } from '../types/vape';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export const fetchVapes = createAsyncThunk('fetchVapes', async () => {
    try {
        const res = await axios.get(`${API_URL}/api/vapes`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
});
export const fetchVapeById = createAsyncThunk<Vape, number, { rejectValue: string }>(
    'vapes/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/vapes/${id}`);
            if (!res.ok) {
                throw new Error('Vape not found');
            }
            return await res.json();
        } catch (error) {
            return rejectWithValue('Не удалось загрузить товар');
        }
    }
);
interface initialState {
    vapes: Vape[];
    currentVape: Vape | null;
    isLoading: boolean;
    error: string | null;
}
const initialState: initialState = {
    vapes: [],
    currentVape: null,
    isLoading: false,
    error: '',
};

const vapeSlice = createSlice({
    name: 'vapes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVapes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVapes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vapes = action.payload;
            })
            .addCase(fetchVapes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchVapeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVapeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentVape = action.payload;
            })
            .addCase(fetchVapeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка';
            });
    },
});
export default vapeSlice.reducer;
