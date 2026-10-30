import { useCallback, useMemo, useState } from 'react'
import { WishlistContext } from './contexts'

const STORAGE_KEY = 'sk-wishlist'

function readStored() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStored(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // storage unavailable (private mode); wishlist just won't persist
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readStored)

  const toggle = useCallback((id) => {
    setIds((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
      writeStored(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ ids, count: ids.length, has: (id) => ids.includes(id), toggle }), [ids, toggle])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
