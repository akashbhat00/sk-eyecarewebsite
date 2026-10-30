import { useCallback, useEffect, useMemo, useState } from 'react'
import { useServices } from '../hooks/useServices'
import { AuthContext } from './contexts'

export function AuthProvider({ children }) {
  const { authService } = useServices()
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    authService
      .getCurrentSession()
      .catch(() => null)
      .then((current) => {
        if (!active) return
        setSession(current)
        setIsLoading(false)
      })
    const unsubscribe = authService.onSessionChange((next) => {
      if (active) setSession(next)
    })
    return () => {
      active = false
      unsubscribe()
    }
  }, [authService])

  const login = useCallback(
    async (email, password) => {
      const next = await authService.login(email, password)
      setSession(next)
      return next
    },
    [authService],
  )

  const logout = useCallback(async () => {
    await authService.logout()
    setSession(null)
  }, [authService])

  const value = useMemo(
    () => ({ session, isLoading, isStaff: authService.isStaff(session), login, logout }),
    [session, isLoading, authService, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
