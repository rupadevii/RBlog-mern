import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function SearchUsers() {
    const {users, loading} = useOutletContext()
    const {theme} = useTheme()
    const {user} = useSelector((state) => state.auth)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        setFollowing(users.map(ele => ele.followers.includes(user._id)))
    }, [user._id, users])

    async function followAuthor(id, idx){
        try{
            const res = await axios.post(`/api/user/follow/${id}`, {}, {
                withCredentials: true
            })
            console.log(res)
            
            setFollowing(prev => (prev.map((item, index) => index === idx ? !item: item)))

        }catch(error){
            console.log(error)
        }
    }

    async function unFollowAuthor(id, idx){
        try{
            const res = await axios.post(`/api/user/unfollow/${id}`, {}, {
                withCredentials: true
            })
            console.log(res)
            setFollowing(prev => (prev.map((item, index) => index === idx ? !item: item)))

        }catch(error){
            console.log(error)
        }
    }  

    return (
        <div className='py-4'>
            {loading ? (
                <div className='flex justify-center'>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    {users.length > 0 ? (
                        users.map((item, index) => (
                            <div className={`my-2 px-5 w-150 py-4 shadow-sm rounded-xl ${theme === "dark" ? "hover:bg-stone-700" : "hover:bg-stone-100"}`} key={item._id}>
                                <div className='flex gap-3 items-center my-1 justify-between'>
                                    <Link to={`/profile/${item._id}`}>
                                    <div className='flex gap-3 items-center'>
                                        <img src={item.avatar} className='w-8 h-8 rounded-full'/>
                                        <div>
                                            <h2 className='font-semibold hover:underline underline-offset-1'>{item.username}</h2>
                                            <p>{item.bio}</p>
                                        </div>
                                    </div>
                                    </Link>
                                    <div>
                                        {following[index] ? (
                                        // {user.following.includes(item._id) ? (
                                            <button className='border rounded-2xl px-3 py-1' onClick={() => followAuthor(user._id, index)}>
                                                UnFollow
                                            </button>
                                        ) : (
                                            item._id !== user._id && (
                                                <button className='border rounded-2xl px-3 py-1' onClick={() => unFollowAuthor(user._id, index)}>
                                                    Follow
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ): (
                        <div className='text-xl mt-4'>No Users found.</div>
                    )}
                </div>
            )}
        </div>
    )
}
