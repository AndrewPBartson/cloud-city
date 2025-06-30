import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar as fullStar,
  faStarHalfAlt as halfStar,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating) // Number of full stars
  const hasHalfStar = rating % 1 !== 0 // Whether to include a half star
  const emptyStars = 5 - Math.ceil(rating) // Fill out w/ empty stars

  const fullStarsArray = Array(fullStars).fill('full')
  const halfStarsArray = hasHalfStar ? ['half'] : []
  const emptyStarsArray = Array(emptyStars).fill('empty')

  const starIcons = [
    ...fullStarsArray.map((_, i) => (
      <FontAwesomeIcon key={`full-${i}`} icon={fullStar} />
    )),
    ...halfStarsArray.map((_, i) => (
      <FontAwesomeIcon key={`half-${i}`} icon={halfStar} />
    )),
    ...emptyStarsArray.map((_, i) => (
      <FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} />
    )),
  ]

  return (
    <div className='book__ratings'>
      <div className='star-wrapper'>{starIcons}</div>
      <span className='rating_text'>{rating}</span>
    </div>
  )
}

export default StarRating
