import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useSearchParams } from 'react-router-dom'

export default function Search() {
    const [searchParam] = useSearchParams()
    const query = searchParam.get('q')
    
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchSearchResults(){
            try{
                setLoading(true)
                const res = await axios.get(`/api/posts/search?q=${query}`)
                setPosts(res.data.posts)
                setUsers(res.data.users)
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        fetchSearchResults()
    }, [query])

    return (
        <main className="w-full flex py-20 min-h-screen gap-15 justify-center">
            <section className='flex w-275 py-3 flex-col items-center'>
                <div className='border-b-2 flex h-12 gap-8 w-200 text-lg justify-center p-2'>
                    <NavLink to={`/search/posts?q=${query}`} style={({ isActive }) => ({
                        color: isActive && "red"
                    })}
                    >
                        <div>Posts</div>
                    </NavLink>
                    <NavLink to={`/search/users?q=${query}`} style={({ isActive }) => ({
                        color: isActive && "red"
                    })}>
                        <div>users</div>
                    </NavLink>
                </div>
                <Outlet context={{users, posts, loading}}/>
            </section>
            
        </main>
    )
}
