import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { userState } from "../types"

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
    const user = useSelector((state: userState) => state.data?.user)
    return user ? element : <Navigate to={"/login"} />
}

export default ProtectedRoute;