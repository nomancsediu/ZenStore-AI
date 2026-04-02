import { createBrowserRouter, redirect } from 'react-router-dom'
import api from '../api'
import { Login, Register, Dashboard } from '../pages'
import { PageLoader } from '../components'

export const dashboardLoader = async () => {
  const token = localStorage.getItem('access')
  if (!token) return redirect('/login')
  try {
    const { data } = await api.get('/products/')
    return { products: data }
  } catch {
    localStorage.clear()
    return redirect('/login')
  }
}

const authLoader = () => {
  const token = localStorage.getItem('access')
  if (token) return redirect('/dashboard')
  return null
}

const Router = (props) =>
  createBrowserRouter([
    { path: '/', loader: () => redirect('/dashboard'), element: <></> },
    { path: '/login', loader: authLoader, element: <Login login={props.login} /> },
    { path: '/register', loader: authLoader, element: <Register register={props.register} /> },
    {
      path: '/dashboard',
      loader: dashboardLoader,
      element: <Dashboard logout={props.logout} />,
      HydrateFallback: PageLoader,
    },
  ])

export default Router