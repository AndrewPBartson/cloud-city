/*
 * Convert raw OMDB movie data into enriched, "book-like" items.
 * Adds properties: title, url, id, rating, fullPrice, salePrice, etc.
 * @param {Array} movies
 * @returns {Array} updated movies as items
 */

export const refactorMovies = (movies) => {
  return movies.map((movie, index) => {
    const {
      imdbID,
      Title = 'Untitled',
      Poster = '',
      imdbRating = '0',
      BoxOffice = '',
      Year = '',
      imdbVotes = '0',
    } = movie

    // Safe conversions
    const ratingInt = convertRatingToInt(imdbRating)
    const rating = Math.round((ratingInt * 5) / 10) / 10

    const boxOfficeInt = convertBoxOfficeToInt(BoxOffice)
    const yearInt = convertYearToInt(Year)
    const votesInt = convertVotesToInt(imdbVotes)

    // fake price calculations -
    // fullPrice should never be less than 1.00
    // fullPrice should never be greater than $30.00
    // rescaling - it's complicated

    // salePrice calculations -
    // randomly decide which items are on sale
    // salePrice is equal to fullPrice * discount

    const fullPrice = getFullPriceFromVotes(votesInt)

    const shouldHaveDiscount = Math.random() < 0.6
    let discountFactor = 0.6 + Math.random() * 0.2 // Between 60–80% of fullPrice

    let salePrice = null
    if (shouldHaveDiscount) {
      salePrice = Number((fullPrice * discountFactor).toFixed(2))
    }

    return {
      ...movie,
      title: Title,
      url: Poster,
      id: createStableId(Title, imdbID),
      ratingInt,
      rating,
      boxOfficeInt,
      yearInt,
      discount: discountFactor,
      fullPrice,
      salePrice,
    }
  })
}

const convertBoxOfficeToInt = (dollarsText) => {
  const result = parseInt(dollarsText.replace(/[$,]/g, ''))
  return isNaN(result) ? 0 : result
}

const convertRatingToInt = (rating) => {
  const result = parseFloat(rating)
  return isNaN(result) ? 0 : Math.round(result * 10)
}

const convertYearToInt = (year) => {
  const result = parseInt(year)
  return isNaN(result) ? 0 : result
}
const convertVotesToInt = (votes) => {
  const result = parseInt(votes.replace(/,/g, ''))
  return isNaN(result) ? 0 : result
}

function createStableId(title, imdbId) {
  const slug = slugify(title).slice(0, 10)
  const suffix = imdbId.slice(-4)
  return `${slug}-${suffix}`
}

function getFullPriceFromVotes(votes) {
  if (!votes || isNaN(votes)) return 0.1

  const logVotes = Math.log10(votes)

  if (logVotes < 3.5) {
    // low popularity, rescale to $1–$10
    return Number(((logVotes / 3.5) * 9 + 1).toFixed(2))
  } else {
    // high popularity, rescale to $10–$30
    const scaled = ((logVotes - 3.5) / (6 - 3.5)) * 20 + 10
    return Number(Math.min(scaled, 30).toFixed(2))
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '') // remove leading/trailing dashes
}

// Save value to localStorage as JSON
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Error saving to localStorage:', err)
  }
}

// Load and parse JSON value from localStorage
export function loadFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null
  } catch (err) {
    console.error('Error loading from localStorage:', err)
    return []
  }
}

export function isImageURLValid(url, timeout = 3000) {
  return new Promise((resolve) => {
    const img = new Image()
    // if image doesn't load or error within 3 seconds, bail
    const timer = setTimeout(() => resolve(false), timeout)

    img.onload = () => {
      clearTimeout(timer)
      resolve(true)
    }

    img.onerror = () => {
      clearTimeout(timer)
      resolve(false)
    }

    img.src = url
  })
}

export const isValidValue = (value) => value && value !== 'N/A'

/* 
Simplify each movie item by removing properties that are not needed. Near the end of the refactoring of the movies, remove the properties that are no longer needed. However consider leaving certain properties that may be useful later such as Country, Language, and Runtime.
 */
