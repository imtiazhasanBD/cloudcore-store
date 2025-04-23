import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const res = await axios.get('https://admin.refabry.com/api/all/product/get');
  return res.data.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'success';
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
