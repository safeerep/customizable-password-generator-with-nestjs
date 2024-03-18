import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ProtectedRoute } from "./components"
import { userState } from "./types"
import { authCheck } from "./context/actions/actions"
import { AppDispatch } from "./context/store"
import {
  Login,
  Main,
  Register
} from './pages'
import { Toaster } from "react-hot-toast"

function App() {
  const user = useSelector((state: userState) => state.data?.user)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        const res: any = await dispatch(authCheck())
        if (res.payload?.success) {
          navigate('/')
        }
        
      }
    }
    checkAuth()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<Main />} />}
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App