import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

export default function SearchSuggestions({input}) {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const {theme} = useTheme()

    useEffect(() => {
        async function fetchSearchResults(){
            try{
                if(input === ""){
                    setPosts([])
                    setUsers([])
                    return;
                }
                const res = await axios.get(`/api/posts/search?q=${input}`)
                setPosts(res.data.posts)
                setUsers(res.data.users)
            }catch(error){
                console.error(error)
            }
        }
        fetchSearchResults()
    }, [input])
    
  return (
        <div className={`search absolute top-15 left-50 w-63 max-h-90 overflow-y-auto ${theme === "dark" ? "bg-stone-800 text-white" : "bg-white text-black"}`}>
            {posts.length>0 && (
                <ul>
                    <li className='underline underline-offset-2 pt-4 px-4'>POSTS</li>
                    {posts.map(post => (
                        <Link to={`/post/${post._id}`}>
                            <li 
                                key={post._id} 
                                className='overflow-ellipsis px-4 py-2 hover:bg-stone-600 line-clamp-2 leading-7'>{post.title}
                            </li>
                        </Link>
                    ))}
                </ul>  
            )}
            {users.length > 0 && (
                <ul>
                    <li className='underline underline-offset-2 p-2 px-4'>USERS</li>
                    {users.map(user => (
                        <Link to={`/profile/${user._id}`}>
                            <li 
                            className='hover:bg-stone-700 py-3 px-4'>
                                <div className='flex gap-3 items-center'>
                            <img src={user.avatar} className='w-6 h-6 rounded-full'/>
                            <div>
                                <h2 className='font-semibold hover:underline underline-offset-1'>{user.username}</h2>
                                <p className='text-sm'>{user.bio}</p>
                            </div>
                        </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
  )
}
