import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [], // Each item: { id, quantity }
  taxRate: 0.1,
  shippingFlatRate: 4.99,
  // calculated values (not saved in state):
  // totalQuantity, totalPrice, totalPriceWithTax, itemSubtotal
}

export const selectCartSummary = (state) => {
  const allItems = state.items.allItems
  const cartItems = state.cart.items

  let totalQuantity = 0
  let totalPrice = 0

  for (const cartItem of cartItems) {
    const item = allItems[cartItem.id]
    if (item) {
      totalQuantity += cartItem.quantity
      totalPrice += item.price * cartItem.quantity
    }
  }

  return { totalQuantity, totalPrice }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, price, quantity = 1 } = action.payload
      const existingItem = state.cartItems.find((i) => i.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cartItems.push({ id, quantity })
      }
      state.totalQuantity += quantity
      state.totalPrice += quantity * (existingItem ? existingItem.price : 0)
    },
    removeItem(state, action) {
      const { id } = action.payload
      const existingItem = state.cartItems.find((i) => i.id === id)
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.price * existingItem.quantity
        state.cartItems = state.cartItems.filter((i) => i.id !== id)
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const existingItem = state.cartItems.find((i) => i.id === id)

      if (!existingItem) return

      if (quantity <= 0) {
        // Remove the item entirely
        state.cartItems = state.cartItems.filter((i) => i.id !== id)
      } else {
        state.totalQuantity += quantity - existingItem.quantity
        existingItem.quantity = quantity
      }
    },
    clearCart(state) {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
