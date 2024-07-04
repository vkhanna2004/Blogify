import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header, Loader } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true);
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    setLoading(false)
  })
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-zinc-800'>
      <div className='w-full block'>
        <Header />
        <main>
       <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <Loader className1="h-20 w-20 bg-zinc-800" className2="bg-zinc-800"/>

  
}

export default App