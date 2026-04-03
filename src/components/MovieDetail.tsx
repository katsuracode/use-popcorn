import { useEffect, useRef, useState } from 'react'
import type { MovieDetailData, WatchData } from '..'
import { Loader } from './Loader'
import StarRating from './StarRating'
import { API_KEY } from '../App'
import { useKey } from '../hooks/useKey'

type MovieDetailProps = {
  selectedId: string
  onCloseMovie: () => void
  onAddWatched: (movie: WatchData) => void
  watched: WatchData[]
}

export const MovieDetail = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailProps) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current++
  }, [userRating])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating

  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie as MovieDetailData

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useKey('Escape', onCloseMovie)

  useEffect(() => {
    const controller = new AbortController()

    const getMovieDetail = async () => {
      setIsLoading(true)
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
        { signal: controller.signal },
      )

      const data = await res.json()
      setIsLoading(false)
      setMovie(data)
    }

    getMovieDetail()

    return () => {
      controller.abort()
    }
  }, [selectedId])

  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`

    return function () {
      document.title = 'usePopcorn'
    }
  }, [title])

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <header>
            {' '}
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}{' '}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
