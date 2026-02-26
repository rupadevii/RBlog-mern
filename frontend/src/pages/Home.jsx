import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/features/postSlice'

export default function Home() {
    const {posts, loading} = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const {theme} = useTheme();

    useEffect(() => {
        dispatch(fetchPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <main className={`w-full flex px-50 py-28 min-h-screen`}>
            <section className='w-100'>
            {loading ? (
                <div className='flex justify-center'>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className='w-100 flex flex-col gap-4'>
                    {posts.map(post => (
                        <div className='p-5 shadow-lg w-200' key={post._id}>
                            <Link to={`/post/${post._id}`}>
                            <div>
                                <h1 className='font-bold text-2xl my-1'>{post.title}</h1>
                                <p className={`text-stone-${theme === "dark" ? "200" : "800"} text-md`}>{post.content}</p>
                            </div>
                            <div className='my-1'>
                                <div className='text-stone-600'>By <i>{post.author.username}</i></div>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            </section>  
        </main> 
    )
}
