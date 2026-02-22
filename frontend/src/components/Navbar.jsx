import React from 'react'
import { Moon, Pencil, Search, Sun } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const location = useLocation()
    const {isAuthenticated, user, logout} = useAuth()
    const isAbsent = location.pathname === "/register" || location.pathname === "/login";
    const {theme, setTheme} = useTheme()

    if(isAbsent) return null;

    async function logoutUser(){
        try{
            const res = await logout();
            console.log(res)
        }
        catch(error){
            console.error(error)
        }

    }

    return (
        <nav className='w-full fixed top-0 bg-red-800 p-5 flex pl-20 pr-12 justify-between items-center'>
            <div className='flex gap-9 items-center ml-10'>
                <Link to="/"><span className='text-lg'>Haha</span></Link>
                <div className='flex items-center relative'>
                    <span className='absolute left-2'><Search size={18}/></span>
                    <input type="text" className='border border-white rounded-xl p-1 pl-8'/>
                </div>
            </div>
            <div>
                <ul className='flex gap-6 items-center'>
                    {
                        isAuthenticated ? (
                            <>
                                <li className='bg-red-700 rounded-3xl px-3 py-2 gap-2 hover:bg-red-600 flex items-center hover:cursor-pointer'>
                                    <Link to="/create"><span className='mb-0'><Pencil size={18}/></span></Link>
                                </li>
                                {user.avatar && (
                                <li>
                                    <Link to="/profile">
                                        <img src={user.avatar} className='w-7 rounded-full hover:cursor-pointer' alt={user.username} />
                                    </Link>
                                </li>
                                )}
                                <li className='hover:underline underline-offset-2 hover:cursor-pointer' onClick={logoutUser}>Logout</li>
                            </>
                            
                        ) : (
                            <li className='flex items-center gap-3'>
                                <Link to="/register"><button className='hover:underline underline-offset-2'>Signup</button></Link>
                                <span>or</span>
                                <Link to="/login">
                                <button className='hover:underline underline-offset-2'>Login</button></Link>
                            </li>
                        )
                    }
                    <button
                     onClick={() => setTheme(prev => (prev=== "light" ? "dark" : "light"))}>
                        {theme==="light" ? <Sun/> : <Moon/>}</button>
                </ul>
            </div>
        </nav>
    )
}
