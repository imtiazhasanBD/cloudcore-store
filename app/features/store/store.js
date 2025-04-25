import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../products/productSlice';
import cartReducer from '../cart/cartSlice'
import { loadState, saveState } from '../localStorage/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    product: store.getState().product,
    cart: store.getState().cart
  })
})
