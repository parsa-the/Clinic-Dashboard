import { useAuthStore } from '../model/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} replace></Navigate>
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute
