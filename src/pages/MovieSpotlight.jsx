import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllItemsArray } from '../state/itemsSlice'

import ItemDetails from '../components/ItemDetails'
import Recommended from '../components/Recommended'

const MovieSpotlight = () => {
  const { id } = useParams()
  const allItems = useSelector(selectAllItemsArray)
  // const items = useSelector((state) => state.items.items)
  let item = ''
  if (allItems || allItems.length > 0) {
    item = allItems.find((item) => item.id === String(id))
  }

  return (
    <div>
      <ItemDetails item={item} />
      <Recommended currentItem={item} />
    </div>
  )
}
export default MovieSpotlight
