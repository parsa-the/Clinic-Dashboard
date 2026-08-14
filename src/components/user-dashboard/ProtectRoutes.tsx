import { useAuthStore } from '../../stores/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoutes = () => {
    const IsLoggedIn = useAuthStore((e)=>e.isLoggedIn)

    if (!IsLoggedIn) {
        return <Navigate to={"/login"} replace></Navigate>
    }
  return (
    <Outlet/>
  )
}

export default ProtectRoutes