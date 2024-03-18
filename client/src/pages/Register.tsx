import { useState } from 'react'
import BG from '../assets/Frame.png'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../context/store'
import { register } from '../context/actions/actions'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMessage('')
        if (!userName || !password) {
            setErrorMessage('Please enter your username and password.')
            return;
        } else if (
            userName.trim() === '' ||
            password.trim() === '' 
        ) {
            setErrorMessage('Please enter your username and password.')
            return;
        }
        const obj: { userName: string, password: string } = {
            userName,
            password
        }
        if (password.length < 4 || userName.length < 4) {
            if (password.length < 4 && userName.length < 4) {
                setErrorMessage('Username and password should contain atleast four chars')
            }
            else if (password.length < 4) {
                setErrorMessage('Password should contain atleast four chars')
            }
            else {
                setErrorMessage('Username should contain atleast four chars')
            }
            return;
        } 
        
        try {  
            const response: any = await dispatch(register(obj))
            if (response?.payload?.success) {
                navigate('/')
                toast.success(response?.payload.message)
            } else {
                setErrorMessage(response?.payload?.message)
            }
        } catch (error: any) {
            setErrorMessage(error?.payload?.message)
        }
    }
    
    return (
        <div className="flex items-center justify-between md:justify-center min-h-screen bg-gray-100 lg:px-32 px-4">
            <div className='hidden lg:block'>
                <img src={BG} alt="" />
            </div>
            <div className="px-8 py-6 bg-white rounded-lg shadow-md text-left w-full md:w-2/3 lg:w-1/2">
                <div className="font-bold text-2xl text-center mb-4">Register</div>
                <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center font-bold">{errorMessage}</div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                            userName
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="userName"
                            type="text"
                            placeholder="Username or Phone"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        onClick={() => navigate('/login')}>
                            already registered? login
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}