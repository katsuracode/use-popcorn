import { useEffect, useState } from 'react'
import { API_KEY } from '../App'
import type { MovieData } from '..'

export const useMovies = (query: string, callback: () => void) => {
  const [movies, setMovies] = useState<MovieData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    callback?.()

    const controller = new AbortController()

    const fetchMovies = async () => {
      if (query.length < 4) {
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal },
        )

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies.')
        }
        const data = await res.json()

        if (data.Response === 'False') {
          throw new Error('No Movie is found')
        }

        setMovies(data.Search)
        console.log(data.Search)

        setIsLoading(false)
      } catch (err) {
        console.error(err)

        if (err instanceof Error) {
          setError(err.message)
        } else {
          if (typeof err === 'string') setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!query.length) {
      setMovies([])
      setError('')
      return
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])

  return { movies, isLoading, error }
}
