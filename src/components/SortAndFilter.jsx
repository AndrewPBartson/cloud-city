import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort, setGenreFilter, setAwardFilter } from '../state/itemsSlice'

const SortAndFilter = () => {
  const dispatch = useDispatch()

  const items = useSelector((state) => state.items.items)

  const getAllGenres = (items) => {
    const allGenres = []
    items.forEach((item) => {
      // convert genre string to array
      let genresArray = item.Genre.split(', ')
      genresArray.forEach((genre) => {
        if (!allGenres.includes(genre)) {
          if (genre !== 'N/A') {
            allGenres.push(genre)
          }
        }
      })
    })
    return allGenres
  }
  // useMemo - recalculate genres only when items change
  const allGenres = useMemo(() => getAllGenres(items), [items])

  // e is passed in via js closure
  const handleChange = (actionCreator) => (e) =>
    dispatch(actionCreator(e.target.value))
  const handleCheck = (actionCreator) => (e) =>
    dispatch(actionCreator(e.target.checked))

  return (
    <div className='filter_sort_box'>
      <div className='sort'>
        <label className='label_text'>Sort Search Results</label>
        <select
          id='sort_general'
          defaultValue='Default'
          onChange={handleChange(setSort)}
        >
          <option value='Default'>Default</option>
          <option value='Rating'>Rating</option>
          <option value='PriceAscending'>Price - Low to High</option>
          <option value='PriceDescending'>Price - High to Low</option>
          <option value='Year'>Year - New Items First</option>
          <option value='YearOld'>Year - Old Items First</option>
          <option value='BoxOffice'>Box Office</option>
          <option value='Title'>Title</option>
          <option value='IMDB_votes'>Number of Reviews</option>
        </select>
      </div>
      <div className='genre'>
        <label className='label_text'>Filter by Genre</label>
        <select
          id='filter_genre'
          defaultValue='All'
          onChange={handleChange(setGenreFilter)}
        >
          <option value='All' key='All'>
            All
          </option>
          {allGenres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className='awards'>
        <label className='awards_wrapper'>
          <div className='label_text awards_div'>Only Award Winners</div>
          <input
            className='awards_checkbox'
            type='checkbox'
            onChange={handleCheck(setAwardFilter)}
          />
          <div className='awards_spacer'>&#xa0;</div>
        </label>
      </div>
    </div>
  )
}

export default SortAndFilter
