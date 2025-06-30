import { useSelector } from 'react-redux'
import ItemIntro from './ItemIntro'
import { selectAllItemsArray } from '../state/itemsSlice'

const Discounted = () => {
  // const items = useSelector((state) => state.items.items)
  const allItems = useSelector(selectAllItemsArray)
  const discountedItems = allItems.filter((item) => item.salePrice != null)

  return (
    <section className='' id='recent'>
      <div className='container'>
        <div className='row'>
          <h2 className='section__title'>
            Discounted <span className='purple'>Media</span>
          </h2>
          <div className='books'>
            {discountedItems
              .filter((item) => item.discount < 0.7 && item.salePrice > 0)
              .slice(0, 8)
              .map((item) => (
                <ItemIntro item={item} key={item.id} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Discounted
