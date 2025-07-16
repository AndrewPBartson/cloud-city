import { refactorMovies, isImageURLValid } from '../utils/dataHandlers.js'

const OMDB_API_KEY = 'ccb97894'
const BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

/**
 * Fetch full movie details for initial array of movies.
 * @param {Array} movieList - inital array of movies w/ minimal details
 * @returns {Promise<Array>} Resolves to array of movies with full details
 */

async function fetchMovieDetails(movieList) {
  if (!movieList || movieList.length === 0) return []

  const detailResults = await Promise.all(
    movieList.map((movie) =>
      fetch(`${BASE_URL}&i=${movie.imdbID}`)
        .then((res) => res.json())
        .catch(() => null)
    )
  )

  // Remove nulls and check image validity
  const validMovies = detailResults.filter(Boolean)

  // Run image checks
  const validationResults = await Promise.all(
    validMovies.map((movie) =>
      isImageURLValid(movie.Poster).then((isValid) => (isValid ? movie : null))
    )
  )

  return validationResults.filter(Boolean)
}

/**
 * Fetch movies based on search query (returns full refactored results)
 * @param {string} searchQuery
 * @returns {Promise<Array>} Resolves to list of movies w/ complete data
 */

export function fetchMovies(searchQuery) {
  return fetch(`${BASE_URL}&s=${searchQuery}&page=1`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.Search) return []

      const totalPages = Math.min(Math.ceil(data.totalResults / 10), 4)
      // create array of length totalPages, if totalPages = 4 => [1, 2, 3, 4]
      const allPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

      const pageFetches = allPageNumbers.map(
        (pageNum) =>
          fetch(`${BASE_URL}&s=${searchQuery}&page=${pageNum}`)
            .then((res) => res.json())
            .catch(() => null) // Handle network errors gracefully
      )

      return Promise.all(pageFetches).then(
        (pages) =>
          pages
            .filter((p) => p && p.Search) // filter out nulls or bad data
            .map((p) => p.Search) // from each page, extract the array of movies
            .flat() // flatten into one array of movies
      )
    })
    .then((movieList) => fetchMovieDetails(movieList))
    .then((movies) => refactorMovies(movies))
    .catch((error) => {
      console.error('Error fetching or refactoring movies:', error)
      return []
    })
}

export const getUserLocation = (fallback = 'Born to Run') => {
  return fetch('https://geolocation-db.com/json/')
    .then((response) => response.json())
    .then((geoData) => geoData.state || fallback)

    .catch((error) => {
      console.error('Error fetching location:', error)
      return fallback
    })
}
