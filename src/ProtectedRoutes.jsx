import { Navigate, Outlet } from "react-router-dom"
import facade from "./facades/apiFacade"

const useAuth = () => {
    const isLoggedIn = facade.loggedIn()
    return isLoggedIn
}

const ProtectedRoutes = () => {
const isAuth = useAuth()

  return isAuth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes
