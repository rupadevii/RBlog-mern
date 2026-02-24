import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DeletePost({closeModal, postId}) {
    const navigate = useNavigate();

    async function deletePost(){
        try{
            const res = await axios.delete(`/api/posts/${postId}`, {
                withCredentials: true,
            })

            console.log(res.data)
            setTimeout(() => {
                navigate(`/`)
            }, 1500)
        }
        catch(error){
            console.error(error)
        }
    }


    return (
        <div className='h-25 w-90 rounded-sm p-2'>
        <h2 className='mb-3 text-lg'>Are you sure you want to delete this post?</h2>
        <div className='flex items-center justify-end w-full gap-4 mt-4'>
            <button
                className="bg-white text-black px-3 py-1.5 rounded-md border hover:bg-gray-200"
                onClick={closeModal}>
                Cancel
            </button>
            <button       
                className="bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white"
                onClick={deletePost}
            >
                Delete
            </button>
        </div>
    </div>
    )
}
