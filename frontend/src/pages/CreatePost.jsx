import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Images} from 'lucide-react'

export default function CreatePost() {
    const {theme} = useTheme()
    const [formDetails, setFormDetails] = useState({title: "", content: ""})
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(null)
    const [errors, setErrors] = useState({title: "", content: ""})
    const navigate = useNavigate()

    function handleChange(e){
        setFormDetails(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function uploadFile(e){
        setFile(e.target.files[0])
        const fileReader = new FileReader()

        fileReader.onload = (e) => {
            const {result} = e.target
            if(result){
                setFileDataURL(result)
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
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
            const res = await axios.post(`/api/posts`, formData, {
                withCredentials: true,
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })

            console.log(res.data)
            
            navigate("/")
            
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <main className={`w-full flex px-50 py-28 min-h-screen`}>
            <section className='w-full'>
                <form className='flex flex-col gap-4 items-center justify-center w-full' onSubmit={handleSubmit}>
                    <div className='flex items-center w-220 gap-5'>
                        <input 
                        type='text' 
                        name='title'
                        value={formDetails.title}
                        onChange={handleChange}
                        className={`my-3 p-4 text-xl w-210 border-l-2 border-stone-500 rounded-sm`}
                        placeholder='Enter Title'/>
                        {errors.title && (<p className='text-red-500 my-2 self-start ml-3'>{errors.title}</p>)}

                        <input 
                            type="file" 
                            onChange={uploadFile} 
                            className='self-center' 
                            style={{display: "none"}} 
                            accept=".png, .jpg, image/png, image/jpeg"
                            id='file'/>
                        <label htmlFor='file'className={`rounded-md cursor-pointer ${theme === "dark" ? "hover:bg-stone-700" : "hover:bg-stone-200"} p-2 border`}>
                            <span><Images /></span>
                        </label>

                    </div>

                    <img src={fileDataURL}/>

                    <textarea 
                        rows="15" 
                        cols="95" 
                        onChange={handleChange} 
                        name="content" 
                        value={formDetails.content}
                        className='border mb-5 p-4 text-lg'></textarea>
                    {errors.content && (<p className='text-red-500 my-2 self-start ml-3'>{errors.content}</p>)}

                    <button type='submit' className='bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white'>Post</button>
                </form>
            </section>
        </main>
    )
}
