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
      <div className='movie'>
        <div className='skeleton item__img--skeleton'></div>
        <div className='skeleton item__title--skeleton'></div>
        <div className='skeleton item__rating--skeleton'></div>
        <div className='skeleton item__price--skeleton'></div>
      </div>
    )
  }

  return (
    <div className='movie'>
      <Link to={`/media/${item.id}`}>
        <figure className='item__img--wrapper'>
          <img
            src={item.url}
            alt={item.title}
            className='item__img'
            onError={(e) => {
              setImageFailed(true)
              e.target.onerror = null
              e.target.src = YouAreLost
            }}
          />
        </figure>
      </Link>
      <div className='item__title'>
        <Link className='item__title--link' to={`/media/${item.id}`}>
          {item.title}
        </Link>
      </div>
      <div className='item__ratings'>
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
