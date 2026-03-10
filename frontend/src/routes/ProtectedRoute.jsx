import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
    const {isAuthenticated, loading} = useSelector((state) => state.auth)

    if(loading){
        return <div>Loading...</div>
    }
    
    if(!isAuthenticated){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}
