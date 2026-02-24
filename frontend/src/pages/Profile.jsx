import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Profile() {
    const {user} = useAuth()
    const [posts, setPosts] = useState([])
    const {theme} = useTheme()
    
    useEffect(() => {
        async function loadPosts(){
            try{
                const res = await axios.get(`/api/posts/user/${user._id}`, {
                    withCredentials: true
                })
                
                setPosts(res.data.posts)
            }catch(error){
                console.log(error)
            }
        }
        loadPosts()
    }, [user])
    
    return (
        <main className={`py-28 px-60 min-h-screen w-full`}>
            {!user  ?(
                <div>Loading...</div>
            ) : (
            <section>
                <div className='px-12 flex gap-4 border-b border-gray-300 pb-3'>
                    <div className='flex items-center flex-col gap-2 justify-center w-75'>
                        <div>
                            {user.avatar && (<img src={user.avatar} className='w-22 h-22 rounded-full'/>)}
                        </div>
                        <div className='flex items-center flex-col'>
                            <h3 className='text-lg my-1'>{user.username}</h3>
                            <p className='font-light'>{user.bio}</p>
                        </div>
                    </div>
                    <div className='flex gap-28 pt-4'>
                        <div className='flex flex-col items-center'>
                            <h4 className='font-bold text-lg'>Followers</h4>
                            <span>{user.followers?.length || 0}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h4 className='font-bold text-lg'>Following</h4>
                            <span>{user.following?.length || 0}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h4 className='font-bold text-lg'>Posts</h4>
                            <span>{posts?.length || 0}</span>
                        </div>
                    </div>
                    <div className='ml-25 mt-2'>
                        <Link to="/update-profile"><button className='rounded-lg bg-red-800 text-white py-2 px-3 hover:bg-red-600 flex items-center'>Update</button></Link>
                    </div>
                </div>
                <div className='pt-8'>
                    {posts.length===0 ? (
                        <div>You have not posted anything yet.</div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            {posts.map(post => (
                            <div className='p-5 shadow-lg w-260' key={post._id}>
                                <Link to={`/post/${post._id}`}>
                                <div>
                                    <h1 className='font-bold text-2xl my-1'>{post.title}</h1>
                                    <p className={`text-stone-${theme=== "dark" ? "300" : "800"} text-md`}>{post.content}</p>
                                </div>
                                </Link>
                            </div>
                            ))} 
                        </div>
                    )}
                </div> 
            </section>
            )} 
        </main>
    )
}
