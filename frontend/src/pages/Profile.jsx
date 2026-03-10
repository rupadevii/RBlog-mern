import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useSelector } from 'react-redux'

export default function Profile() {
    const {user, loading} = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([])
    const {theme} = useTheme()
    const {id} = useParams()
    const [profile, setProfile] = useState(user)
    const [isFollowing, setIsFollowing] = useState(false)
    
    async function loadPosts(){
        try{
            const res = await axios.get(`/api/posts/user/${id}`, {
                withCredentials: true
            })
            
            setPosts(res.data.posts)
        }catch(error){
            console.log(error)
            setPosts([])
        }
    }

    async function loadProfile(){
        try{
            const res = await axios.get(`/api/user/user-profile/${id}`, {
                withCredentials: true
            })
            
            setProfile(res.data.user)
            console.log(res.data.user.followers.some(item => item === user._id))
            setIsFollowing(res.data.user.followers.some(item => item === user._id))
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
       if(!user) return

        if(user._id !== id){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadProfile()
        }else{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfile(user)
        }
        loadPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, id])

    async function followAuthor(){
        try{
            const res = await axios.post(`/api/user/follow/${id}`, {}, {
                withCredentials: true
            })
            
            console.log(res)
            setProfile(prev => ({...prev, followers: [...prev.followers, user._id]}))
            
            setIsFollowing(true)

        }catch(error){
            console.log(error)
        }
    }

    async function unFollowAuthor(){
        try{
            const res = await axios.post(`/api/user/unfollow/${id}`, {}, {
                withCredentials: true
            })
            console.log(res)
            setProfile(prev => ({...prev, followers: prev.followers.filter(item => item !== user._id)}))
            setIsFollowing(false)

        }catch(error){
            console.log(error)
        }
    }

    if(loading || !user){
        return <div>Loading...</div>
    }

    return (
        <main className={`flex justify-center py-28 min-h-screen w-full`}>
            <section>
                {profile && (
                    <div className='flex gap-10 lg:gap-4 border-b border-gray-300 pb-3 justify-center'>
                        <div className='flex items-center flex-col gap-2 justify-center w-25 lg:w-75'>
                            <div>
                                {profile.avatar && (<img src={profile.avatar} className='w-22 h-22 rounded-full'/>)}
                            </div>
                            <div className='flex items-center flex-col text-center'>
                                <h3 className='text-lg my-1'>{profile.username}</h3>
                                <p className='font-light'>{profile.bio}</p>
                            </div>
                            
                        </div>
                        <div className='flex gap-14 lg:gap-34'>
                            <div className='flex flex-col md:flex-row gap-6 md:gap-18 lg:gap-28 pt-4'>
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-bold text-lg'>Followers</h4>
                                    <span>{profile.followers?.length || 0}</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-bold text-lg'>Following</h4>
                                    <span>{profile.following?.length || 0}</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <h4 className='font-bold text-lg'>Posts</h4>
                                    <span>{posts?.length || 0}</span>
                                </div>
                            </div>
                                    
                            {profile._id === user._id ? (
                            <div className='mt-2'>
                                <Link to="/update-profile"><button className='rounded-lg bg-red-800 text-white py-2 px-3 hover:bg-red-600 flex items-center'>Update</button></Link>
                            </div>

                            ) : (
                                <div className='mt-2'>
                                    {isFollowing ? (
                                        <button className='rounded-lg bg-red-800 text-white py-2 px-3 hover:bg-red-600 flex items-center' onClick={unFollowAuthor}>Unfollow</button>
                                    ) : (
                                        <button className='rounded-lg bg-red-800 text-white py-2 px-3 hover:bg-red-600 flex items-center' onClick={followAuthor}>Follow</button>
                                    )}
                                </div>
                            )}
                        </div>
                        
                    </div>
                    )}
                <div className='pt-8'>
                    {posts.length===0 ? (
                        <div className='flex justify-center text-lg'>
                                No Posts.
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 items-center'>
                            {posts.map(post => (
                            <div className='p-5 shadow-lg w-105 md:w-180 lg:w-260' key={post._id}>
                                <Link to={`/post/${post._id}`}>
                                <div>
                                    <h1 className='font-bold text-2xl my-1'>{post.title}</h1>
                                    <p className={`${theme=== "dark" ? "text-stone-300" : "text-stone-800"} text-md line-clamp-2`}>{post.content}</p>
                                </div>
                                </Link>
                            </div>
                            ))} 
                        </div>
                    )}
                </div> 
            </section>
        </main>
    )
}
