import { formattedDate } from '../../utils/date'
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TrendingPostSkeleton } from '../skeleton/TrendingPostSkeleton';

export default function TrendingPosts() {
    const { theme } = useTheme();
    const [trendingPosts, setTrendingPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchTrendingPosts() {
            try{
                setIsLoading(true)
                const res = await api.get('/api/posts/trending')
                setTrendingPosts(res.data.trendingPosts.slice(0, 5))
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchTrendingPosts()
    }, [])

    return (
        <div className='w-full'>
            {isLoading ? (
                <SkeletonTheme
                    baseColor={theme === 'dark' ? '#292524' : '#e7e5e4'}
                    highlightColor={theme === 'dark' ? '#44403c' : '#f5f5f4'}
                >
                    <Skeleton height={24} width={100} />
                    <div className='py-3 flex flex-col gap-2'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TrendingPostSkeleton key={i} />
                        ))}
                    </div>
                </SkeletonTheme>
            ) : (
                <div>
                    {trendingPosts.length > 0 && (
                        <>
                            <h2 className='text-xl font-bold'>Trending</h2>
                            <div className='py-3'>
                                {trendingPosts.map(post => (
                                    <div className={`px-5 py-4 shadow-sm ${theme === "dark" ? "hover:bg-stone-700" : "hover:bg-stone-100"}`} key={post._id}>
                                        <Link to={`/post/${post._id}`}>
                                            <h3 className='font-bold text-lg line-clamp-2'>{post.title}</h3>
                                            <div className='flex flex-wrap gap-2 items-center my-1'>
                                                <img src={post.author[0].avatar} className='w-5 h-5 rounded-full shrink-0' />
                                                <p className='truncate max-w-30'>{post.author[0].username}</p>
                                                -
                                                <span><i>{formattedDate(post.createdAt)}</i></span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}