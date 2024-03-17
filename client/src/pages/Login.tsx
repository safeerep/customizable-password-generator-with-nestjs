import { useEffect, useState } from 'react'
import BG from '../assets/Frame.png'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../context/store';
import { authCheck, login } from '../context/actions/actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            const response = await dispatch(authCheck())
            if (response.payload) {
                navigate('/')
            }
        }
        checkAuth()
    }, [dispatch])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!userName || !password) {
            setErrorMessage('Please enter your userName and password.')
            return;
        }
        console.log(`userName: ${userName}, Password: ${password}`)
        setErrorMessage('')
        const response :any = await dispatch(login({ userName, password }))
        if (response?.success) {
            navigate('/')
            toast.success(response?.message)
        } else {
            setErrorMessage(response?.message)
        }
    }

    return (
        <div className="flex items-center justify-between md:justify-center min-h-screen bg-gray-100 lg:px-32 px-4">
            <div className='hidden lg:block'>
                <img src={BG} alt="" />
            </div>
            <div className="px-8 py-6 bg-white rounded-lg shadow-md text-left w-full md:w-2/3 lg:w-1/2">
                <div className="font-bold text-2xl text-center mb-4">Sign in</div>
                <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center font-bold">{errorMessage}</div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="enter your unique username"
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign in
                        </button>
                        {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Recover Password?
                        </a> */}
                    </div>
                    <div className="text-center">
                        <span className='text-xl font-bold'>OR</span>
                    </div>
                    <div className="text-center">
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Create a new account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
};