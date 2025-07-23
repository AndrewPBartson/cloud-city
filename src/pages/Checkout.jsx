import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyCart from '../assets/empty_cart.svg'
import {
  selectSmartCartItems,
  selectCartSummary,
} from '../features/cartSelectors'
import { toast } from 'react-toastify'

const Checkout = () => {
  const smartItems = useSelector(selectSmartCartItems)
  const { totalQuantity, totalPrice } = useSelector(selectCartSummary)
  const taxRate = useSelector((state) => state.cart.taxRate)
  const shippingFlatRate = useSelector((state) => state.cart.shippingFlatRate)

  const handleOrder = () => {
    toast.warning(`Demo only! Not taking orders! 🛒`, {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  return (
    <div className='main_wrapper'>
      <main className='main'>
        <div className='std_container'>
          <div className='row'>
            <div className='item__selected--top'>
              <h2 className='cart__title'>Checkout</h2>
            </div>
            <div className='checkout_wrapper'>
              <div className='panel_A'>
                <div className='checkout_row'>
                  <div className='checkout_title'>Shipping address</div>
                  <button className='arrow'>&#x25BC;</button>
                </div>
                <div className='checkout_row'>
                  <div className='checkout_title'>Payment</div>
                  <button className='arrow'>&#x25BC;</button>
                </div>
                <div className='checkout_list'>
                  <div className='checkout_title'>Cart Items</div>
                  <div>
                    {smartItems.length === 0 ? (
                      <div className='cart__empty'>
                        <img
                          src={EmptyCart}
                          alt=''
                          className='cart__empty--img'
                        />
                        <h2>Your cart is empty!</h2>
                        <Link to='/media'>
                          <button className='btn'>Browse Movies</button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        {smartItems.map((item, idx) => (
                          <div
                            className='checkout__item--wrapper'
                            key={`${item.id}-${idx}`}
                          >
                            <div className='checkout__item'>
                              <img
                                src={item.url}
                                alt=''
                                className='cart__item--img'
                              />
                              <div className='checkout__item--info'>
                                <span className='cart__item--title'>
                                  {item.title}
                                </span>
                                <span className='checkout__item--price'>
                                  $
                                  {item.salePrice != null
                                    ? item.salePrice.toFixed(2)
                                    : item.fullPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className='item_totals'>
                              <div className='checkout__quantity'>
                                <div className='quantity_text'>Quantity</div>
                                <div className='quantity_number red bold'>
                                  &#xa0;{item.quantity}
                                </div>
                              </div>
                              <div className='checkout__total purple bold'>
                                $
                                {(item.salePrice != null
                                  ? item.salePrice * item.quantity
                                  : item.fullPrice * item.quantity
                                ).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='panel_B'>
                <div className='btn_wrapper'>
                  <button className='btn btn_top' onClick={handleOrder}>
                    Place your order
                  </button>
                </div>
                <div className='total__item'>
                  <span>Items ({totalQuantity})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className='total__item'>
                  <span>Shipping</span>
                  <span>${shippingFlatRate}</span>
                </div>
                <div className='total__item'>
                  <span>Tax</span>
                  <span>${(totalPrice * taxRate).toFixed(2)}</span>
                </div>
                <div className='total__item'>
                  <span className='show_order'>Order total</span>
                  <span className='show_order'>
                    $
                    {(totalPrice * (taxRate + 1) + shippingFlatRate).toFixed(2)}
                  </span>
                </div>

                <div className='btn_wrapper'>
                  <Link to='/cart'>
                    <button className='btn btn_middle btn_to_edit_cart'>
                      Edit your Cart
                    </button>
                  </Link>
                  <Link to='/media'>
                    <button className='btn btn_last btn_continue'>
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Checkout
