import { useState, useEffect } from 'react'
import StarRating from './mini-components/StarRating'
import YouAreLost from '../assets/no_results.jpg'
import { Link } from 'react-router-dom'
import Price from './mini-components/Price'

const ItemIntro = ({ item }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const [img, setImg] = useState()

  useEffect(() => {
    if (!item) return
    const image = new Image()
    image.src = item.url
    image.onload = () => {
      setImg(image)
    }
  }, [item])

  // useEffect(() => {
  //   console.log('req status:', status)
  // }, [status])

  if (!item || !img || imageFailed) {
    return (
      <div className='book'>
        <div className='skeleton book__img--skeleton'></div>
        <div className='skeleton book__title--skeleton'></div>
        <div className='skeleton book__rating--skeleton'></div>
        <div className='skeleton book__price--skeleton'></div>
      </div>
    )
  }

  return (
    <div className='book'>
      <Link to={`/media/${item.id}`}>
        <figure className='book__img--wrapper'>
          <img
            src={item.url}
            alt={item.title}
            className='book__img'
            onError={(e) => {
              setImageFailed(true)
              e.target.onerror = null
              e.target.src = YouAreLost
            }}
          />
        </figure>
      </Link>
      <div className='book__title'>
        <Link className='book__title--link' to={`/media/${item.id}`}>
          {item.title}
        </Link>
      </div>
      <div className='book__ratings'>
        <StarRating rating={item.rating} />
      </div>
      <Price
        fullPrice={item.fullPrice.toFixed(2)}
        salePrice={item.salePrice ? item.salePrice.toFixed(2) : null}
      />
    </div>
  )
}

export default ItemIntro
