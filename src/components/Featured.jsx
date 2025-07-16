import { useSelector } from 'react-redux'
import ItemIntro from './ItemIntro'
import { selectAllItemsArray } from '../state/itemsSlice'

const Featured = () => {
  const status = useSelector((state) => state.items.status)
  // const error = useSelector((state) => state.items.error)
  const allItems = useSelector(selectAllItemsArray)
  const featuredItems = allItems.filter((item) => item.ratingInt >= 30)
  console.log('Featured items:', featuredItems)

  return (
    <section id='featured'>
      <div className='featured_container'>
        <div className='row'>
          <h2 className='section__title'>
            Featured <span className='purple'>Movies</span>
          </h2>
          {/* alternative - sort by box office, 
              and then slice to get top 4 */}
          <div className='movies'>
            {status === 'loading' ? (
              <p>Loading...</p>
            ) : (
              featuredItems
                .filter((item) => item.rating > 3.0)
                .slice(0, 4)
                .map((item) => <ItemIntro item={item} key={item.id} />)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Featured
