import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// Add to Cart action
export const AddToCart = createAsyncThunk(
  "products/add_to_cart",
  async (product) => {
    return product;
  }
);
// Update to Cart action
export const UpdateQty = createAsyncThunk(
  "products/update_quantity",
  async (payload) => {
    return payload;
  }
);

// Remove from Cart action
export const RemoveFromCart = createAsyncThunk(
  "products/remove_from_cart",
  async (id) => {
    return id;
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(AddToCart.rejected, (state,action) => {
          state.isLoading = false;
          state.error = "Failed to fetch data" || action.error.message;
      })
      .addCase(AddToCart.fulfilled, (state,action) => {
        const existing = state.items.find(item => item.id === action.payload.id);
        state.isLoading = false;
        existing
          ? (existing.qty += 1)
          : state.items.push({ ...action.payload, qty: 1 });
      })
      .addCase(UpdateQty.fulfilled, (state,action) =>  {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) item.qty = action.payload.qty;
      })
      .addCase(RemoveFromCart.fulfilled, (state,action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      })
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
