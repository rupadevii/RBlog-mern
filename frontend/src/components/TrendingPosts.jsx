import axios from 'axios'
import { formattedDate } from '../utils/date'
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function TrendingPosts() {
    const {theme} = useTheme();
    const [trendingPosts, setTrendingPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
        
    useEffect(() => {
        async function fetchTrendingPosts(){
            try{
                setIsLoading(true)
                const res = await axios.get('/api/posts/trending')
                setTrendingPosts(res.data.trendingPosts.slice(0,5))
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchTrendingPosts()
    }, [])

    return (
        <div>
            <h2 className='text-xl font-bold'>Trending</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='py-3'>
                    {trendingPosts.map(post => (
                        <div className={`px-5 py-4 shadow-sm ${theme === "dark" ? "hover:bg-stone-700" : "hover:bg-stone-100"}`} key={post._id}>
                            <Link to={`/post/${post._id}`}>
                                <h3 className='font-bold text-lg line-clamp-2'>{post.title}</h3>
                                <div className='flex gap-2 items-center my-1'>
                                    <img src={post.author[0].avatar} className='w-5 h-5 rounded-full'/>
                                    <p>{post.author[0].username}</p>
                                    -
                                    <span><i>{formattedDate(post.createdAt)}</i></span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
