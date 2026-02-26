import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {
    const {id} = useParams()
    const location = useLocation()
    const [formDetails, setFormDetails] = useState({title: location.state.title, content: location.state.content})
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({title: "", content: ""})
    const navigate = useNavigate()
    
    function handleChange(e){
        setFormDetails(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    function uploadFile(e){
        setFile(e.target.files[0])
    }
    
    async function handleSubmit(e){
        e.preventDefault()

        let error = {}
        for(let key in formDetails){
            if(!formDetails[key]) error[key] = `${key[0].toUpperCase()+key.slice(1)} is required`
        }
        
        if(Object.keys(error).length>0){
            setErrors(error)
            return
        }
        
        const formData = new FormData()
        
        formData.append('post-pic',file)
        formData.append('title', formDetails.title)
        formData.append('content', formDetails.content)

        try{
            const res = await axios.put(`/api/posts/${id}`, formData, {
                withCredentials: true,
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })

            console.log(res.data)
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }
        catch(error){
            console.error(error)
        }
    }
    
    return (
        <main className={`mt-18 py-10 px-60 min-h-screen`}>
            <section>
                <form className='flex flex-col gap-4 items-start' onSubmit={handleSubmit}>
                    <input 
                    type='text' 
                    name='title'
                    value={formDetails.title}
                    onChange={handleChange}
                    className='my-2 p-3 w-75 border border-zinc-500 rounded-sm'
                    placeholder='Enter Title'/>
                    {errors.title && (
                        <p className='text-red-500 my-2 self-start ml-3'>{errors.title}</p>
                    )}

                    <textarea 
                        rows="15" 
                        cols="50" 
                        onChange={handleChange} 
                        name="content" 
                        value={formDetails.content}
                        className='border'>
                    </textarea>

                    <input type="file" onChange={uploadFile}/>

                    <button type='submit' className='bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white'>Save</button>
                </form>
            </section>
        </main>
    )
}
