import { useState } from 'react'
import BG from '../assets/Frame.png'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (!email || !password) {
            setErrorMessage('Please enter your email and password.')
            return;
        }
        console.log(`Email: ${email}, Password: ${password}`)
        setErrorMessage('')
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
                            Enter Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Email or Phone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Recover Password?
                        </a>
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
}