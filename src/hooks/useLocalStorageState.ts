import { useEffect, useState } from 'react'
import type { WatchData } from '..'

export const useLocalStorageState = (initialState: string[], key: string) => {
  const [value, setValue] = useState<WatchData[]>(() => {
    const storedValue: string | null = localStorage.getItem(key)

    return storedValue ? JSON.parse(storedValue) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
