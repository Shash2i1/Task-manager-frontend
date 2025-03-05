import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import User from "../ApiUtils/user"
import { useDispatch } from "react-redux"
import { login, logout } from "../store/authSlice"
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  //method to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("")

    try {
      const response = await User.loginUser(data);
      if (response) {
        const userData = await User.getCurrentUser();
        if (userData) dispatch(login(userData))
        navigate("/dashboard")
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log("Error while login ", error)
      setError(error.response?.data?.message)
    }
  }
  return (
    <div className='w-80 h-auto bg-green-300 rounded-lg shadow-lg '>
      <h1 className='text-center py-4 text-lg font-bold text-blue-400'>Login</h1>
      {error && <p className="text-center text-red-400 py-2">{error}</p>}
      <form
        onSubmit={handleLogin}
        className='flex flex-col pt-2  gap-4'
      >
        <input type="email" placeholder='Email' name='email' className='p-2 rounded-lg mx-4' onChange={handleOnChange} />
        <input type="password" placeholder='Password' name='password' className='p-2 rounded-lg mx-4' onChange={handleOnChange} />
        <p className='text-end pr-2'>Don&apos;t have account ?
          <Link to="/">Click here</Link>
        </p>
        <button type='submit' className='p-2 rounded-lg m-4 bg-blue-600 text-white hover:bg-blue-800'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm