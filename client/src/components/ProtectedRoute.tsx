import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../context/store";
import { authCheck } from "../context/actions/actions";

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const check = async () => {
            const res: any = await dispatch(authCheck())
            if (!res.payload?.success) {
                navigate('/login')
            }
        }
        check()
    }, [])

    return element;
}

export default ProtectedRoute;