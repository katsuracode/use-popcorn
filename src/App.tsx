import { useState } from 'react'
import type { WatchData } from '.'
import { Box } from './components/Box'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { Logo } from './components/Logo'
import { Main } from './components/Main'
import { MovieDetail } from './components/MovieDetail'
import { MovieList } from './components/MovieList'
import { NavBar } from './components/NavBar'
import { NumResults } from './components/NumResults'
import { Search } from './components/Search'
import { WatchedMovieList } from './components/WatchedMovieList'
import { WatchedSummary } from './components/WatchedSummary'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import { useMovies } from './hooks/useMovies'

export const API_KEY = '41668ec6'

const App = () => {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  /*
  const [watched, setWatched] = useState<WatchData[]>(() => {
    const storedValue: string | null = localStorage.getItem('watched')

    if (storedValue) return JSON.parse(storedValue)
  })*/

  const [watched, setWatched] = useLocalStorageState([], 'watched')

  const handleSelectMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)

  const handleAddWatched = (movie: WatchData) => {
    setWatched((watched) => [...watched, movie])
  }

  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((watch) => watch.imdbID !== id))
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

export default App
