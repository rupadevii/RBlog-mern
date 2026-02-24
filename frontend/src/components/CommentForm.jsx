import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CommentForm({postId}) {
    const [comment, setComment] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const res = await axios.post(`/api/comments`, {post: postId, content:comment}, {
                withCredentials: true,
            })

            console.log(res.data)
            setTimeout(() => {
                navigate(`/post/${postId}`)
            }, 1500)
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <form 
            className='flex flex-col gap-4 items-start' 
            onSubmit={handleSubmit}>
                <textarea 
                    rows="3" 
                    onChange={(e) => setComment(e.target.value)} 
                    name="content" 
                    value={comment} 
                    className='border w-full'>
                </textarea>
                <button 
                    type='submit' 
                    className='bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white'>Comment</button>
        </form>
    )
}
