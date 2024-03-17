import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
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

function App() {
  const user = useSelector((state: userState) => state.data?.user)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(authCheck())
    }
  }, [dispatch])

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
    </>
  )
}

export default App