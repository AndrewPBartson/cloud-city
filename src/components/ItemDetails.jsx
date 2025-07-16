import { Link } from 'react-router-dom'
// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../state/cartSlice'
import { selectAllItemsArray } from '../state/itemsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from './mini-components/StarRating'
import Price from './mini-components/Price'
import { isValidValue } from '../utils/dataHandlers'
import { toast } from 'react-toastify'

const ItemDetails = ({ item }) => {
  const dispatch = useDispatch()
  const allItems = useSelector(selectAllItemsArray)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const inCart = cartItems.find((i) => i.id === item.id)

  // useEffect(() => {
  //   if (item) {
  //     console.log('item.salePrice', item.salePrice)
  //     console.log('item.fullPrice', item.fullPrice)
  //   }
  // }, [item])

  const handleAddToCart = () => {
    dispatch(addItem({ id: item.id, quantity: 1 }))
    toast.success(`${item.title} added to cart! 🛒`, {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  return (
    <div className='main_wrapper'>
      <main className='main'>
        <div className='std_container'>
          <div className='row details_row'>
            <div className='back_link_wrapper'>
              <Link to='/media' className='item__link'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className='item__back--icon'
                />
              </Link>
              <Link to='/media' className='item__link'>
                <h2 className='back_link_title'>New Search</h2>
              </Link>
            </div>
            <div className='item__selected'>
              {item && item.title ? (
                <>
                  <figure className='item__selected--figure'>
                    <img
                      src={item.url}
                      alt=''
                      className='item__selected--img'
                    />
                  </figure>

                  <div className='item__selected--description'>
                    <h2 className='item__selected--title'>{item.title}</h2>
                    <StarRating rating={item.rating} />

                    <div className='item__selected--price'>
                      <Price
                        fullPrice={item.fullPrice.toFixed(2)}
                        salePrice={
                          item.salePrice ? item.salePrice.toFixed(2) : null
                        }
                      />
                    </div>
                    <div className='item__summary'>
                      <h3 className='item__summary--title'>Summary</h3>

                      {isValidValue(item.Plot) && (
                        <p className='item__summary--para'>{item.Plot}</p>
                      )}
                      {isValidValue(item.yearInt) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Year</h3>
                          <p>{item.yearInt}</p>
                        </div>
                      )}
                      {isValidValue(item.Genre) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Genres </h3>
                          <p>{item.Genre}</p>
                        </div>
                      )}
                      {isValidValue(item.Director) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Director </h3>
                          <p>{item.Director}</p>
                        </div>
                      )}
                      {isValidValue(item.Actors) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Actors </h3>
                          <p>{item.Actors}</p>
                        </div>
                      )}
                      {isValidValue(item.Awards) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Awards </h3>
                          <p>{item.Awards}</p>
                        </div>
                      )}
                      {isValidValue(item.BoxOffice) && (
                        <div className='subtitle_wrapper'>
                          <h3 className='media_subtitle'>Box Office </h3>
                          <p>{item.BoxOffice}</p>
                        </div>
                      )}
                    </div>
                    <div className='flex'>
                      <button
                        className='btn btn_addItem btn_top'
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                      {inCart && (
                        <div className='in_cart_message'>
                          ✅ In your cart
                          <div className='green bold align-right'>
                            Quantity: {inCart.quantity}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link to='/cart'>
                      <button className='btn btn_last btn_to_cart'>
                        View your Cart
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default ItemDetails
