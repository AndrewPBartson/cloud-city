import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyCart from '../assets/empty_cart.svg'
import { selectSmartCartItems, selectCartSummary } from '../state/cartSelectors'
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
        <div className='media_container'>
          <div className='row'>
            <div className='book__selected--top'>
              <h2 className='cart__title'>Checkout</h2>
            </div>
            <div className='checkout_wrapper'>
              <div className='left_panel'>
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
                  <div className='test'>
                    {smartItems.length === 0 ? (
                      <div className='cart__empty'>
                        <img
                          src={EmptyCart}
                          alt=''
                          className='cart__empty--img'
                        />
                        <h2>Your cart is empty!</h2>
                        <Link to='/media'>
                          <button className='btn'>Browse Media</button>
                        </Link>
                      </div>
                    ) : (
                      <div className='test_2'>
                        {smartItems.map((item) => (
                          <div className='cart__item' key={item.id}>
                            <div className='cart__book'>
                              <img
                                src={item.url}
                                alt=''
                                className='cart__book--img'
                              />
                              <div className='cart__book--info'>
                                <span className='cart__book--title'>
                                  {item.title}
                                </span>
                                <span className='cart__book--price'>
                                  $
                                  {item.salePrice != null
                                    ? item.salePrice.toFixed(2)
                                    : item.fullPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className='cart__quantity'>
                              <div className='quantity_label'>
                                Quantity: &#xa0;
                              </div>
                              <div className='quantity_text'>
                                {item.quantity}
                              </div>
                            </div>
                            <div className='cart__total'>
                              $
                              {(item.salePrice != null
                                ? item.salePrice * item.quantity
                                : item.fullPrice * item.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='right_panel'>
                <div className='btn_wrapper'>
                  <button className='btn btn_top' onClick={handleOrder}>
                    Place your order
                  </button>
                </div>
                <div className='total__item total__tax'>
                  <span className='left_margin'>Items ({totalQuantity})</span>
                  <span className='right_margin'>${totalPrice}</span>
                </div>
                <div className='total__item total__tax'>
                  <span className='left_margin'>Shipping</span>
                  <span className='right_margin'>${shippingFlatRate}</span>
                </div>
                <div className='total__item total__tax'>
                  <span className='left_margin'>Tax</span>
                  <span className='right_margin'>
                    ${(totalPrice * taxRate).toFixed(2)}
                  </span>
                </div>
                <div className='total__item total__tax'>
                  <span className='show_order left_margin'>Order total</span>
                  <span className='show_order right_margin'>
                    ${(totalPrice * (taxRate + 1)).toFixed(2)}
                  </span>
                </div>

                <div className='btn_wrapper'>
                  <Link to='/cart'>
                    <button className='btn btn_middle btn_continue'>
                      Edit your Cart
                    </button>
                  </Link>
                  <Link to='/media'>
                    <button className='btn btn_last btn_to_search'>
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
