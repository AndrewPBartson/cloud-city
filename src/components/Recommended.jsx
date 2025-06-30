import { useSelector } from 'react-redux'
import ItemIntro from './ItemIntro'

const Recommended = ({ currentItem }) => {
  const items = useSelector((state) => state.items.items)
  const status = useSelector((state) => state.items.status)
  // const error = useSelector((state) => state.items.error)

  // Prepare sorted, filtered recommendations
  const recommendedItems =
    status === 'succeeded'
      ? [...items]
          .sort((a, b) => b.boxOfficeInt - a.boxOfficeInt)
          .filter((media) => media.rating > 3.0 && media.id !== currentItem?.id)
          .slice(0, 4)
      : []

  return (
    <section id='recommended'>
      <div className='rec_container'>
        <div className='row'>
          <h2 className='book__selected--title--top'>
            Recommended <span className='purple'>Media</span>
          </h2>
          <div className='books'>
            {status === 'loading' ? (
              <p>Loading...</p>
            ) : (
              recommendedItems.map((rec) => (
                <ItemIntro item={rec} key={rec.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recommended
