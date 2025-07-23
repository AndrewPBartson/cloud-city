import { useSelector } from 'react-redux'
import ItemIntro from './ItemIntro'
import { selectAllItemsArray } from '../features/itemsSlice'

const Discounted = () => {
  const allItems = useSelector(selectAllItemsArray)
  const discountedItems = allItems.filter((item) => item.salePrice != null)

  return (
    <section className='' id='recent'>
      <div className='discounted_container'>
        <div className='row'>
          <h2 className='section__title'>
            Discounted <span className='purple'>Movies</span>
          </h2>
          <div className='movies'>
            {discountedItems
              .filter((item) => item.discount < 0.7 && item.salePrice > 0)
              .slice(0, 8)
              .map((item, idx) => (
                <ItemIntro item={item} key={`${item.id}-${idx}`} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Discounted
