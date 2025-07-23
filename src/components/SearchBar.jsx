import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { loadItems } from '../features/itemsSlice'
import { setSearchQuery } from '../features/itemsSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state) => state.items.searchQuery)

  const onSearch = async (e) => {
    e.preventDefault()
    const input = document.getElementById('search_title')
    const searchTerm = input.value

    try {
      const resultAction = await dispatch(loadItems(searchTerm))
      if (loadItems.fulfilled.match(resultAction)) {
        console.log('Search results:', resultAction.payload)
      }
    } catch (err) {
      console.error('Search failed:', err)
    }
  }

  return (
    <form id='search_form' className='search_wrapper'>
      <div className='input_flick'>
        <input
          id='search_title'
          className='text_input'
          type='text'
          placeholder='Search by Title'
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          autoFocus
        />
        <button className='search_btn' onClick={(e) => onSearch(e)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  )
}
export default SearchBar
