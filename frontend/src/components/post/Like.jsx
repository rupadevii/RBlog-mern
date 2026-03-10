import axios from 'axios'
import { ThumbsUp } from 'lucide-react'

export default function Like({isLiked, post, setPost}) {
    async function likePost(){
        try{
            const res = await axios.post(`/api/posts/like/${post._id}`, {
                withCredentials: true,
            })
            setPost(prev => ({...prev, likes:res.data.post.likes}))
        }
        catch(error){
            console.error(error)
        }
    }

    async function unlikePost(){
        try{
            const res = await axios.post(`/api/posts/unlike/${post._id}`, {
                withCredentials: true,
            })
            setPost(prev => ({...prev, likes:res.data.post.likes}))
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            {!isLiked ? (
                <button onClick={likePost}>
                    <ThumbsUp />
                </button>
            ) : (
                <button onClick={unlikePost}>
                    <ThumbsUp fill='green' color='green'/>
                </button>
            )}
            <p>{post.likes && post.likes.length} likes</p>
        </div>
    )
}
