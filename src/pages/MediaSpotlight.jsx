import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ItemDetails from '../components/ItemDetails'
import Recommended from '../components/Recommended'

const MediaSpotlight = () => {
  const { id } = useParams()
  const items = useSelector((state) => state.items.items)
  let item = ''
  if (items || items.length > 0) {
    item = items.find((item) => item.id === String(id))
  }

  return (
    <div>
      <ItemDetails item={item} />
      <Recommended currentItem={item} />
    </div>
  )
}
export default MediaSpotlight
