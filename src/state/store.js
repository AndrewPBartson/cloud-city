import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './itemsSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
  },
})
