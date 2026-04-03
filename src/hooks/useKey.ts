import { useEffect } from 'react'

export const useKey = (key: string, action: () => void) => {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action()
      }
    }

    document.addEventListener('keydown', callback)

    return function () {
      document.removeEventListener('keydown', callback)
    }
  }, [action, key])
}
