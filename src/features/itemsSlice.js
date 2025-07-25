import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { fetchMovies, getUserLocation } from '../services/api'
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/dataHandlers'

// this is a selector and a pure function. It is not a reducer)
export const selectFilteredSortedItems = (state) => {
  // must copy state bc sort is mutating
  let items = [...state.items.items]
  const { genre, awards } = state.items.filters
  const sort = state.items.sort

  // Filter by genre
  if (genre && genre !== 'All') {
    items = items.filter((item) => item.Genre?.includes(genre))
  }

  // Filter by awards
  if (awards) {
    items = items.filter((item) => item.Awards && item.Awards !== 'N/A')
  }

  // Sort
  switch (sort) {
    case 'PriceAscending':
      items.sort(
        (a, b) => (a.salePrice || a.fullPrice) - (b.salePrice || b.fullPrice)
      )
      break
    case 'PriceDescending':
      items.sort(
        (a, b) => (b.salePrice || b.fullPrice) - (a.salePrice || a.fullPrice)
      )
      break
    case 'Rating':
      items.sort((a, b) => b.ratingInt - a.ratingInt)
      break
    case 'Year':
      items.sort((a, b) => b.yearInt - a.yearInt)
      break
    case 'YearOld':
      items.sort((a, b) => a.yearInt - b.yearInt)
      break
    case 'BoxOffice':
      items.sort((a, b) => b.boxOfficeInt - a.boxOfficeInt)
      break
    case 'Title':
      items.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'IMDB_votes':
    case 'Default':
      items.sort((a, b) => b.imdbVotesInt - a.imdbVotesInt)
      break
    default:
      break
  }

  return items
}

const selectAllItemsObj = (state) => state.items.allItems

// convert allItems object to array
export const selectAllItemsArray = createSelector(
  [selectAllItemsObj],
  (itemsObj) => Object.values(itemsObj)
)

// Async thunk to load from localStorage, or fetch from OMDB
export const loadItems = createAsyncThunk(
  'items/loadItems',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // set up variables
      let currentItems = []
      let savedItems = loadFromLocalStorage('items') || []
      let newQuery = searchTerm?.trim()
      let savedQuery = loadFromLocalStorage('searchQuery') || ''
      // console.log('inside level 1')
      // console.log('savedQuery', savedQuery)

      if (newQuery) {
        // console.log('inside level 2')
        saveToLocalStorage('searchQuery', newQuery)
        currentItems = await fetchMovies(newQuery)
      } else {
        // newQuery is empty
        // console.log('inside level 3')
        // console.log('savedQuery', savedQuery)
        if (savedItems.length > 0) {
          currentItems = savedItems
          // console.log('inside level 4')
        } else {
          // if no newQuery and no savedItems, check for savedQuery
          // console.log('inside level 5')
          if (savedQuery) {
            // console.log('savedQuery', savedQuery)
            // console.log('inside level 6')
            currentItems = await fetchMovies(savedQuery)
          }
          // if currentItems is still empty
          // no new query / no saved items / no (valid) savedQuery
          if (currentItems.length === 0) {
            // search by user location
            // console.log('inside level 7')
            let userLocation = await getUserLocation()
            // console.log('inside level 7.5', userLocation)
            saveToLocalStorage('searchQuery', userLocation)
            currentItems = await fetchMovies(userLocation)
          }
        }
      }
      // final steps -
      if (currentItems.length !== 0) {
        saveToLocalStorage('items', currentItems)
      }
      // console.log('items:', currentItems)
      // console.log('outside again')

      return currentItems
    } catch (err) {
      console.error('loadItems error:', err)
      return rejectWithValue('Failed to load items')
    }
  }
)

const initialState = {
  items: [], // currently displayed (search results)
  allItems: {}, // key: id, value: full item object //  lookup table
  searchQuery: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  sort: 'Default',
  filters: {
    genre: 'All',
    awards: false,
  },
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setGenreFilter(state, action) {
      // console.log('genre action.payload', action.payload)
      state.filters.genre = action.payload
    },
    setAwardFilter(state, action) {
      // console.log(' award action.payload', action.payload)
      state.filters.awards = action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        action.payload.forEach((item) => {
          state.allItems[item.id] = item
        })
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unknown error occurred'
      })
  },
})

export const {
  setItems,
  setSort,
  setGenreFilter,
  setAwardFilter,
  setSearchQuery,
} = itemsSlice.actions

export default itemsSlice.reducer
