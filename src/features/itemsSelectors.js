import { createSelector } from '@reduxjs/toolkit'

// Base selectors
const selectItemsState = (state) => state.items

export const selectItems = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.items
)

export const selectAllItemsObj = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.allItems
)

export const selectAllItemsArray = createSelector(
  [selectAllItemsObj],
  (itemsObj) => Object.values(itemsObj)
)

export const selectSearchQuery = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.searchQuery
)

export const selectSort = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.sort
)

export const selectFilters = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.filters
)

export const selectStatus = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.status
)

export const selectError = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.error
)

// Derived selector: filtered and sorted items
export const selectFilteredSortedItems = createSelector(
  [selectItems, selectFilters, selectSort],
  (items, filters, sort) => {
    let filtered = [...items]

    if (filters.genre && filters.genre !== 'All') {
      filtered = filtered.filter((item) => item.Genre?.includes(filters.genre))
    }

    if (filters.awards) {
      filtered = filtered.filter((item) => item.Awards && item.Awards !== 'N/A')
    }

    switch (sort) {
      case 'PriceAscending':
        filtered.sort(
          (a, b) => (a.salePrice || a.fullPrice) - (b.salePrice || b.fullPrice)
        )
        break
      case 'PriceDescending':
        filtered.sort(
          (a, b) => (b.salePrice || b.fullPrice) - (a.salePrice || a.fullPrice)
        )
        break
      case 'Rating':
        filtered.sort((a, b) => b.ratingInt - a.ratingInt)
        break
      case 'Year':
        filtered.sort((a, b) => b.yearInt - a.yearInt)
        break
      case 'YearOld':
        filtered.sort((a, b) => a.yearInt - b.yearInt)
        break
      case 'BoxOffice':
        filtered.sort((a, b) => b.boxOfficeInt - a.boxOfficeInt)
        break
      case 'Title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'IMDB_votes':
      case 'Default':
        filtered.sort((a, b) => b.imdbVotesInt - a.imdbVotesInt)
        break
      default:
        break
    }

    return filtered
  }
)
