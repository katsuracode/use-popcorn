import type { WatchData } from '..'

const average = (arr: Array<number>) => {
  const result = arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0)
  return Math.round(result * 10) / 10
}

type WatchedSummaryProps = {
  watched: WatchData[]
}

export const WatchedSummary = ({ watched }: WatchedSummaryProps) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}
