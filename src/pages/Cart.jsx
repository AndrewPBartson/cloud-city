import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../features/cartSlice'
import EmptyCart from '../assets/empty_cart.svg'
import { Link } from 'react-router-dom'
import {
  selectSmartCartItems,
  selectCartSummary,
} from '../features/cartSelectors'

const Cart = () => {
  const dispatch = useDispatch()

  const smartItems = useSelector(selectSmartCartItems)
  const { totalPrice } = useSelector(selectCartSummary)
  const taxRate = useSelector((state) => state.cart.taxRate)

  return (
    <div className='cap_the_width'>
      <main className='main'>
        <div className='std_container'>
          <div className='row'>
            <div className='item__selected--top'>
              <h2 className='cart__title'>Cart</h2>
            </div>
            <div className='labels_wrapper'>
              <span className='product_label'>Product</span>
              <span className='quantity_label'>Quantity</span>
              <span className='price_label'>Price</span>
            </div>
            {smartItems.length === 0 ? (
              <div className='cart__empty'>
                <img src={EmptyCart} alt='' className='cart__empty--img' />
                <h2>Your cart is empty!</h2>
                <Link to='/media'>
                  <button className='btn'>Search for Movies</button>
                </Link>
              </div>
            ) : (
              <div className='cart'>
                <div className='cart__body'>
                  {smartItems.map((item, idx) => (
                    <div
                      className='cart__item--wrapper'
                      key={`${item.id}-${idx}`}
                    >
                      <div className='cart__item'>
                        <img
                          src={item.url}
                          alt=''
                          className='cart__item--img'
                        />
                        <div className='cart__item--info'>
                          <span className='cart__item--title'>
                            {item.title}
                          </span>
                          <span className='cart__item--price'>
                            $
                            {item.salePrice != null
                              ? item.salePrice.toFixed(2)
                              : item.fullPrice.toFixed(2)}
                          </span>
                          <button
                            className='cart__item--remove'
                            onClick={() =>
                              dispatch(
                                removeItem({
                                  id: item.id,
                                  quantity: item.quantity,
                                })
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className='cart__quantity'>
                        <input
                          type='number'
                          min={0}
                          max={999}
                          step={1}
                          className='cart__input'
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: parseInt(e.target.value, 10),
                              })
                            )
                          }
                        />
                      </div>
                      <div className='cart__total'>
                        $
                        {item.salePrice != null
                          ? (item.salePrice * item.quantity).toFixed(2)
                          : (item.fullPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='total'>
                  <div className='total__item total__sub-total'>
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className='total__item total__tax'>
                    <span>Tax</span>
                    <span>${(totalPrice * taxRate).toFixed(2)}</span>
                  </div>
                  <div className='total__item total__price'>
                    <span>Total</span>
                    <span>${(totalPrice * (taxRate + 1)).toFixed(2)}</span>
                  </div>
                  <div className='cart_btns'>
                    <Link to='/checkout'>
                      <button className='btn btn_to_checkout btn_top'>
                        Proceed to Checkout
                      </button>
                    </Link>
                    <Link to='/media'>
                      <button className='btn btn_to_search btn_last'>
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Cart
