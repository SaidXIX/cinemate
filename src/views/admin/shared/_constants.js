export const sortBy = [
  { value: 'title.asc', label: 'Title ASC' },
  { value: 'title.desc', label: 'Title DESC' },
  { value: 'popularity.asc', label: 'Popularity ASC' },
  { value: 'popularity.desc', label: 'Popularity DESC' },
  { value: 'primary_release_date.asc', label: 'Release date ASC' },
  { value: 'primary_release_date.desc', label: 'Release date DESC' }
]

export const languages = [
  { value: 'en-US', label: 'English' },
  { value: 'ar-SA', label: 'Arabic' }
]
export const movieGenres = [
  {
    value: 28,
    label: 'Action'
  },
  {
    value: 12,
    label: 'Adventure'
  },
  {
    value: 16,
    label: 'Animation'
  },
  {
    value: 35,
    label: 'Comedy'
  },
  {
    value: 80,
    label: 'Crime'
  },
  {
    value: 99,
    label: 'Documentary'
  },
  {
    value: 18,
    label: 'Drama'
  },
  {
    value: 10751,
    label: 'Family'
  },
  {
    value: 14,
    label: 'Fantasy'
  },
  {
    value: 36,
    label: 'History'
  },
  {
    value: 27,
    label: 'Horror'
  },
  {
    value: 10402,
    label: 'Music'
  },
  {
    value: 9648,
    label: 'Mystery'
  },
  {
    value: 10749,
    label: 'Romance'
  },
  {
    value: 878,
    label: 'Science Fiction'
  },
  {
    value: 10770,
    label: 'TV Movie'
  },
  {
    value: 53,
    label: 'Thriller'
  },
  {
    value: 10752,
    label: 'War'
  },
  {
    value: 37,
    label: 'Western'
  }
]

export const tvGenres = [
  {
    value: 10759,
    label: 'Action & Adventure'
  },
  {
    value: 16,
    label: 'Animation'
  },
  {
    value: 35,
    label: 'Comedy'
  },
  {
    value: 80,
    label: 'Crime'
  },
  {
    value: 99,
    label: 'Documentary'
  },
  {
    value: 18,
    label: 'Drama'
  },
  {
    value: 10751,
    label: 'Family'
  },
  {
    value: 10762,
    label: 'Kvalues'
  },
  {
    value: 9648,
    label: 'Mystery'
  },
  {
    value: 10763,
    label: 'News'
  },
  {
    value: 10764,
    label: 'Reality'
  },
  {
    value: 10765,
    label: 'Sci-Fi & Fantasy'
  },
  {
    value: 10766,
    label: 'Soap'
  },
  {
    value: 10767,
    label: 'Talk'
  },
  {
    value: 10768,
    label: 'War & Politics'
  },
  {
    value: 37,
    label: 'Western'
  }
]

export const handleAddToFavorites = (show, type) => {
  const favorites = JSON.parse(localStorage.getItem('Favorites')) || []
  const favoriteItem = {
    id: show.id,
    name: type === 'tv' ? show.name : show.title,
    image: show.poster_path,
    type
  }

  const isAlreadyInFavorites = favorites.some(item => item.id === favoriteItem.id)

  if (!isAlreadyInFavorites) {
    favorites.push(favoriteItem)
    localStorage.setItem('Favorites', JSON.stringify(favorites))
  } else {
    console.log('Item already exists in favorites.')
  }
}

export const handleAddToWatchlist = (show, type) => {
  const watchlist = JSON.parse(localStorage.getItem('Watchlist')) || []
  const watchlistItem = {
    id: show.id,
    name: type === 'tv' ? show.name : show.title,
    image: show.poster_path,
    type
  }

  const isAlreadyInWatchlist = watchlist.some(item => item.id === watchlistItem.id)

  if (!isAlreadyInWatchlist) {
    watchlist.push(watchlistItem)
    localStorage.setItem('Watchlist', JSON.stringify(watchlist))
  } else {
    console.log('Item already exists in watchlist.')
  }
}
