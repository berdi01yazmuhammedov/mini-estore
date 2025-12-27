import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Vape } from '../types/vape';
import axios from 'axios';
export const fetchVapes = createAsyncThunk('fetchVapes', async () => {
    try {
        const res = await axios.get('http://localhost:3001/api/vapes');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
});

interface initialState {
    vapes: Vape[];
    isLoading: boolean;
    error: string;
}
const initialState: initialState = {
    vapes: [],
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
            });
    },
});
export default vapeSlice.reducer;
