export const selectCartSummary = (state) => {
  const allItems = state.items.allItems
  const cartItems = state.cart.cartItems

  let totalQuantity = 0
  let totalPrice = 0

  for (const cartItem of cartItems) {
    const item = allItems[cartItem.id]
    if (item) {
      totalQuantity += cartItem.quantity
      item.salePrice
        ? (totalPrice += item.salePrice * cartItem.quantity)
        : (totalPrice += item.fullPrice * cartItem.quantity)
    }
  }
  return { totalQuantity, totalPrice }
}

export const selectSmartCartItems = (state) => {
  const allItems = state.items.allItems
  return state.cart.cartItems
    .map((cartItem) => {
      const item = allItems[cartItem.id]
      return item ? { ...item, quantity: cartItem.quantity } : null
    })
    .filter(Boolean)
}
