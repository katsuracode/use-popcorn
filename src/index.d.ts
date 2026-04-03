export type MovieData = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export type WatchData = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  runtime: number
  imdbRating: number
  imdbRating: number
  userRating: number
}

export type MovieDetailData = {
  Title: string
  Year: string
  Runtime: string
  Poster: string
  imdbRating: number
  Plot: string
  Released: string
  Actors: string[]
  Director: string
  Genre: string
}
