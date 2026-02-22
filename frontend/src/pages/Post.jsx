import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Post() {
    const {user} = useAuth()
    const {theme} = useTheme()
    const {id} = useParams()
    const [post, setPost] = useState({})
    
    const formattedDate = (createdAt) => {
        const date = new Date(createdAt)
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    useEffect(() => {
        async function loadPosts(){
            try{
                const res = await axios.get(`/api/posts/${id}`)
                setPost(res.data.post)
            }catch(error){
                console.log(error)
            }
        }
        loadPosts()
    }, [user])
    
    return (
        <main className={`mt-18 px-60 ${theme} min-h-screen`}>
            <section className='py-12 px-18 border-b-2 border-gray-300'>
                <div>
                    <h1 className='text-5xl font-bold my-5'>{post.title}</h1>
                    <div className='flex items-center gap-3 mb-5'>
                        <img src={post.author?.avatar} className='w-8 rounded-full'/>
                        <span className='hover:underline underline-offset-2 hover:cursor-pointer'>{post.author?.username}</span>
                        {post.createdAt && <span>{formattedDate(post.createdAt)}</span>}
                    </div>
                    <div className=''>
                        {post.image && (
                            <img src={post.image} className='w-400 mb-10' alt={post.title}/>
                        )}
                        <p className='text-lg'>{post.content}</p>
                    </div>
                </div>
            </section>
            
        </main>
    )
}
