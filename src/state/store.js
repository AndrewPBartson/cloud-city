import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../features/itemsSlice'
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  devTools: {
    name: 'cloud-city', // name of instance in Redux DevTools
  },
})
