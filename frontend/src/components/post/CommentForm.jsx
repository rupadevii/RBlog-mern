import axios from 'axios'
import { useState } from 'react'

export default function CommentForm({postId, setComments}) {
    const [comment, setComment] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const res = await axios.post(`/api/comments`, {post: postId, content:comment}, {
                withCredentials: true,
            })
            setComments(prev => ([res.data.comment, ...prev]))
            setComment("")
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
                    rows="2" 
                    onChange={(e) => setComment(e.target.value)} 
                    name="content" 
                    value={comment} 
                    className='border w-full p-3'>
                </textarea>
                <button 
                    type='submit' 
                    className='bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white'>Comment</button>
        </form>
    )
}
