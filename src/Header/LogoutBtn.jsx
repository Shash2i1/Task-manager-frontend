import React from 'react'
import User from "../ApiUtils/user"
import { useNavigate } from 'react-router-dom';
import {logout} from "../store/authSlice"
import {useDispatch} from "react-redux"

export default function LogoutBtn() {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const handleLogout = async() =>{
        try {
            await User.logoutUser();
            dispatch(logout())
            navigate("/")
        } catch (error) {
          console.log("Error while logging out", error)
        }
  }
  return (
    <button onClick={handleLogout} type='button' className='bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-800'>
        Logout
    </button>
  )
}
