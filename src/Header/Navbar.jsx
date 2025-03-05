import React from 'react'
import LogoutBtn from './LogoutBtn'
import {useSelector} from "react-redux"

function Navbar() {
  const authStatus = useSelector( (state) => state.auth.status)
  
  return (
    <div className='w-full h-20 bg-red-200 flex justify-between items-center px-4 '>
        <h1 className='text-red-600 font-bold'>Task Manager</h1>
        {authStatus && <LogoutBtn/>}
    </div>
  )
}

export default Navbar