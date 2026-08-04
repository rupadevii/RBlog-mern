import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import CardSkeleton from '../skeleton/CardSkeleton';
import { SkeletonTheme } from 'react-loading-skeleton';

export default function SuggestedFollows() {
    const {theme} = useTheme();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [following, setFollowing] = useState(new Array(3).fill(false))

    useEffect(() => {
        async function fetchUsers(){
            try{
                setIsLoading(true)
                const res = await api.get('/api/user/suggested')
                setUsers(res.data.users)
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [])

    async function followAuthor(id, idx){
        try{
            const res = await axios.post(`/api/user/follow/${id}`, {})
            console.log(res)

            setFollowing(prev => (prev.map((item, index) => index === idx ? !item : item)))

        }catch(error){
            console.log(error)
        }
    }

    async function unFollowAuthor(id, idx){
        try{
            await api.post(`/api/user/unfollow/${id}`, {})
            setFollowing(prev => (prev.map((item, index) => index === idx ? !item : item)))

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='pb-12 pt-3 w-full'>
            {isLoading ? (
                <SkeletonTheme
                    baseColor={theme === 'dark' ? '#292524' : '#e7e5e4'}
                    highlightColor={theme === 'dark' ? '#44403c' : '#f5f5f4'}
                >
                    <CardSkeleton cardItems={8} />
                </SkeletonTheme>
            ) : (
                <div>
                    {users.length > 0 && (
                        <>
                            <h2 className='text-xl font-bold'>Who To Follow</h2>
                            <div className='py-4'>
                                {users.map((user, index) => (
                                    <div className={`my-2 px-5 py-4 shadow-sm rounded-xl ${theme === "dark" ? "hover:bg-stone-700" : "hover:bg-stone-100"}`} key={user._id}>
                                        <div className='flex gap-3 items-center my-1 justify-between'>
                                            <Link to={`/profile/${user._id}`} className='min-w-0 flex-1'>
                                                <div className='flex gap-3 items-center min-w-0'>
                                                    <img src={user.avatar} className='w-8 h-8 rounded-full shrink-0' />
                                                    <div className='min-w-0'>
                                                        <h2 className='font-semibold hover:underline underline-offset-1 truncate'>{user.username}</h2>
                                                        <p className='truncate text-sm'>{user.bio}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className='shrink-0'>
                                                {following[index] ? (
                                                    <button className='border rounded-2xl px-3 py-1' onClick={() => unFollowAuthor(user._id, index)}>
                                                        UnFollow
                                                    </button>
                                                ) : (
                                                    <button className='border rounded-2xl px-3 py-1' onClick={() => followAuthor(user._id, index)}>
                                                        Follow
                                                    </button>
                                                )}
                                            </div>
                                        </div>
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
