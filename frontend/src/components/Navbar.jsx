import { Moon, Pencil, Search, Sun } from "lucide-react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logout } from '../redux/features/authSlice'
import { useState } from "react"
import SearchSuggestions from "./SearchSuggestions"

export default function Navbar() {
    const location = useLocation()
    const {user, isAuthenticated} = useSelector((state) => state.auth)
    const isAbsent = location.pathname === "/register" || location.pathname === "/login";
    const {theme, setTheme} = useTheme()
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const navigate = useNavigate()
    
    if(isAbsent) return null;

    async function logoutUser(){
        try{
            const res = await axios.post(`/api/auth/logout`, {
                withCredentials: true
            })
            setTimeout(() => {
                dispatch(logout({user: res.data.user}))
            }, 1000)
        }
        catch(error){
            console.error(error.response.data.msg)
        }

    }

    function handleKeyDown(e){
        setShowSuggestions(true)
        setInput(e.target.value)
        if(e.key === "Enter"){
            navigate(`/search?title=${input}`);
        }
    }

    return (
        <nav className='w-full fixed top-0 bg-red-800 p-5 flex pl-20 pr-12 justify-between items-center' onClick={() => setShowSuggestions(false)}>
            <div className='flex gap-9 items-center ml-10'>
                <Link to="/"><span className='text-lg'>Haha</span></Link>
                <div className='flex items-center relative'>
                    <span className='absolute left-2'><Search size={18}/></span>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='border border-white rounded-xl p-1 pl-8 relative'/>
                </div>
                {showSuggestions && (
                    <SearchSuggestions input={input}/>
                )}

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
                                    <Link to={`/profile/${user._id}`}>
                                        <img src={user.avatar} className='w-7 h-7 rounded-full hover:cursor-pointer' alt={user.username} />
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
