import { useState, useEffect } from 'react';
import Navbar from './Header/Navbar';
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import User from './ApiUtils/user';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userData = await User.getCurrentUser();
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout)
        }
      } catch (error) {
        console.log(error)
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [])
  return !isLoading ? (
    <div className='w-screen h-screen bg-black-800 flex flex-col justify-center items-center'>
      <Navbar />
      <main className='w-full h-full'>
        <Outlet />
      </main>
    </div>
  ) : null
}

export default App;
