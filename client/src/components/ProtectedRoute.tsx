import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../context/store";

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
    const user = useSelector((state: RootState) => state.user?.data)
    return user ? element : <Navigate to={"/login"} />
}

export default ProtectedRoute;