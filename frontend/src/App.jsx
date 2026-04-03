import { useState, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import api from './api'
import Router from './router'
import { PageLoader } from './components'

export default function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('access')
    return token ? { token } : null
  })

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login/', { username, password })
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    setUser({ token: data.access })
  }

  const register = async (username, email, password) => {
    await api.post('/auth/register/', { username, email, password })
    await login(username, password)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout/', { refresh: localStorage.getItem('refresh') })
    } finally {
      localStorage.clear()
      setUser(null)
    }
  }

  const router = useMemo(
    () => Router({ login, register, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return <RouterProvider router={router} fallbackElement={<PageLoader />} />
}