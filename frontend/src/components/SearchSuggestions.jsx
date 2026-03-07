import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function SearchSuggestions({input}) {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const {theme} = useTheme()

    useEffect(() => {
        async function fetchSearchResults(){
            try{
                if(input === "") return;
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
        <div className={`absolute top-15 left-50 w-65 max-h-90 overflow-y-auto p-4 ${theme === "dark" ? "bg-stone-800 text-white" : "bg-white text-black"}`}>
            {posts.length>0 && (
                <ul>
                    <li className='underline underline-offset-2'>POSTS</li>
                    {posts.map(post => (
                        <li className=' overflow-ellipsis my-1 hover:bg-stone-600 p-2'>{post.title}</li>
                    ))}
                </ul>  
            )}
            {users.length > 0 && (
                <ul>
                    <li className='underline underline-offset-2 mb-2'>USERS</li>
                    {users.map(user => (
                        <li className='p-2 hover:bg-stone-700'>{user.username}</li>
                    ))}
                </ul>
            )}
        </div>
  )
}
