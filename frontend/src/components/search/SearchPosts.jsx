import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function SearchPosts() {
    const {posts, loading} = useOutletContext()
    const {theme} = useTheme()

    return (
        <section className='py-4'>
            {loading ? (
                <div className='flex justify-center'>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className='flex flex-col gap-5'>
                    {posts.map(post => (
                        <Link to={`/post/${post._id}`}>
                        <div className='p-5 shadow-lg w-200 flex gap-4 justify-between items-center' key={post._id}>
                            <div className='flex-7'>
                                <div>
                                    <h1 className='font-bold text-2xl my-1 line-clamp-2'>{post.title}</h1>
                                    <p className={`${theme === "dark" ? "text-stone-200" : "text-stone-800"} text-[17px] line-clamp-2`}>{post.content}</p>
                                </div>
                                <div className='mt-3 flex gap-2 items-center'>
                                    <img src={post.author.avatar} alt={post.author.username} className='w-8 h-8 rounded-full'/>
                                    <p className='text-stone-600'><i>{post.author.username}</i></p>
                                </div>
                            </div>
                            {post.image && (
                                <div className='flex-2'>
                                    <img src={post.image} className='w-40 h-27'/>
                                </div>
                            )}
                        </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}
