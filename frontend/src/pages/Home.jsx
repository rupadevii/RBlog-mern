import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import { decreasePage, fetchPosts, increasePage } from '../redux/features/postSlice'
import TrendingPosts from '../components/home/TrendingPosts'
import SuggestedFollows from '../components/home/SuggestedFollows'

export default function Home() {
    const {posts, loading, page} = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const {theme} = useTheme();

    useEffect(() => {
        dispatch(fetchPosts(page))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    
    return (
        <main className={`w-full flex py-20 min-h-screen gap-15`}>
            <section className='flex justify-center w-275 py-8'>
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
                <div className='flex justify-center my-4 gap-2'>
                    <button onClick={() => dispatch(decreasePage())} className='border rounded-md p-1 hover:bg-red-800'><ChevronLeft /></button>
                    <button onClick={() => dispatch(increasePage())} className='border rounded-md p-1 hover:bg-red-800'><ChevronRight/></button>
                </div>
                </div>
            )}
            </section> 
            <aside className='aside w-110 border-l-2 border-stone-300 fixed right-0 px-10 py-8 h-screen overflow-y-auto'>
                <TrendingPosts/>

                <SuggestedFollows/>
            </aside>
        </main> 
    )
}
