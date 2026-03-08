import axios from 'axios'
import { ThumbsUp } from 'lucide-react'
import React from 'react'

export default function Like({isLiked, post, setPost}) {
    async function handleClick(){
        try{
            const res = await axios.post(`/api/posts/like/${post._id}`, {
                withCredentials: true,
            })
            console.log(res)
            setPost(prev => ({...prev, likes:res.data.post.likes}))
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <button onClick={handleClick}>{!isLiked ? (
                <ThumbsUp />
            ) : (
                <ThumbsUp fill='green' color='green'/>
            )}
            </button>
            <p>{post.likes && post.likes.length} likes</p>
        </div>
    )
}
