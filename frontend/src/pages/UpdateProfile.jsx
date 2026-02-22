import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function UpdateProfile() {
    const {user, setUser} = useAuth()
    const {theme} = useTheme()
    const [file, setFile] = useState(null)
    const [formDetails, setFormDetails] = useState({username: user.username, bio: user.bio || ""})
    const navigate = useNavigate();

    function handleChange(e){
        setFormDetails(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    function uploadFile(e){
        setFile(e.target.files[0])
    }

    
    async function handleSubmit(e){
        e.preventDefault()
        
        const formData = new FormData()
        
        formData.append('profile-pic',file)
        formData.append('username', formDetails.username)
        formData.append('bio', formDetails.bio)

        try{
            const res = await axios.post(`/api/user/profile`, formData, {
                withCredentials: true,
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            const {updates} = res.data
            setUser(prev => ({...prev, ...updates}))

            setTimeout(() => {
                navigate("/profile")
            }, 1500)
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <section className={`min-h-screen ${theme} flex justify-center pt-20`}>
            <form noValidate className='flex flex-col rounded-md p-10' onSubmit={handleSubmit}>
                <input type="file" onChange={uploadFile}/>
                <label htmlFor='username'>Username:</label>
                <input 
                    type='text'
                    id='username' 
                    name='username'
                    value={formDetails.username}
                    onChange={handleChange}
                    className='my-2 p-3 w-75 border border-zinc-500 rounded-sm'
                    />

                <label htmlFor='bio'>Bio:</label>
                <input 
                    type="text" 
                    name='bio'
                    id='bio'
                    value={formDetails.bio}
                    onChange={handleChange}
                    className='my-2 p-3 w-75 border border-zinc-500 rounded-sm'
                    placeholder='Enter bio'/>

                <div className=''>
                    <button className='border rounded-sm px-3 py-2'>Cancel</button>
                    <button type='submit' className='bg-red-900 px-3 py-2 rounded-md mt-4 hover:bg-red-800 text-white'>Update</button>
                </div>
                    
            </form>
        </section>
    )
}
