import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredSortedItems } from '../features/itemsSelectors'
import ItemIntro from '../components/ItemIntro'
import SearchBar from '../components/SearchBar'
import SortAndFilter from '../components/SortAndFilter'
import YouAreLost from '../assets/no_results.jpg'

const Search = () => {
  const items = useSelector(selectFilteredSortedItems)
  const status = useSelector((state) => state.items.status)

  const [imageLoaded, setImageLoaded] = useState(false)

  const isLoading = status === 'loading'
  const isError = status === 'failed'
  const isSuccess = status === 'succeeded'
  const noResults = (items.length === 0 && isSuccess) || isError

  let content = null

  if (isLoading) {
    content = Array(8)
      .fill(null)
      .map((_, i) => <ItemIntro key={`skeleton-${i}`} />)
  } else if (isError) {
    content = (
      <div className='no-results'>
        <img src={YouAreLost} alt='No results or server error' />
        <h3 className='error-text'>No way! The server returned an error!</h3>
      </div>
    )
  } else if (noResults) {
    content = (
      <div className='no-results'>
        <img
          src={YouAreLost}
          alt='No results'
          onLoad={() => setImageLoaded(true)}
          className={`no-results__img ${imageLoaded ? 'loaded' : ''}`}
        />
        {imageLoaded && (
          <h3>
            Your search returned <span className='error-text'>No Results</span>
          </h3>
        )}
      </div>
    )
  } else {
    content = items
      .slice(0, 20)
      .map((item, idx) => <ItemIntro item={item} key={`${item.id}-${idx}`} />)
  }

  return (
    <div className='search_body'>
      <main id='search_main'>
        <section>
          <div className='search_container'>
            <div className='row'>
              <div className='search_ui_wrapper'>
                <div className='search_ui'>
                  <h2 className='section__title search_title'>
                    <span className='star'>✨</span>
                    Search for Movies
                    <span className='star'>✨</span>
                  </h2>
                  <SearchBar />
                </div>
                <div className='sort_ui'>
                  <SortAndFilter />
                </div>
              </div>
              <div className='movies'>{content}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Search
