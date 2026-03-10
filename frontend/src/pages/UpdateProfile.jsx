import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../redux/features/authSlice'

export default function UpdateProfile() {
    const {user} = useSelector((state) => state.auth)
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(user.avatar)
    const [formDetails, setFormDetails] = useState({username: user.username, bio: user.bio || ""})
    const navigate = useNavigate();
    const dispatch = useDispatch()

    function handleChange(e){
        setFormDetails(prev => ({...prev, [e.target.name]:e.target.value}))
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
            const updates = {...user, ...res.data.updates}

            //dispatch the update action from authSlice to reflect the changes made on the profile page
            dispatch(update({user:updates}))

            navigate(`/profile/${user._id}`)
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <main className='w-full flex py-28'>
            <section className="min-h-screen flex justify-center w-full">
                <form noValidate 
                    className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                    
                    <input 
                        type="file" 
                        onChange={uploadFile} 
                        className='self-center' 
                        style={{display: "none"}} 
                        accept=".png, .jpg, image/png, image/jpeg"
                        id='file'/>
                    <label htmlFor='file'>
                        <img src={fileDataURL} className='w-30 h-30 rounded-full'/>
                    </label>

                    <div className='flex flex-col'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type='text'
                            id='username' 
                            name='username'
                            value={formDetails.username}
                            onChange={handleChange}
                            className='my-2 p-3 w-80 lg:w-100 border border-zinc-500 rounded-sm'
                            />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='bio'>Bio:</label>
                        <input 
                            type="text" 
                            name='bio'
                            id='bio'
                            value={formDetails.bio}
                            onChange={handleChange}
                            className='my-2 p-3 w-80 lg:w-100 border border-zinc-500 rounded-sm'
                            placeholder='Enter bio'/>
                    </div>

                    <div className='flex w-full justify-between items-center'>
                        <Link to={`/profile/${user._id}`}>
                            <button 
                            className='border rounded-sm px-3 py-2' 
                            >Cancel</button>
                        </Link>
                        <button 
                            type='submit' 
                            className='bg-red-900 px-3 py-2 rounded-md hover:bg-red-800 text-white'>Update</button>
                    </div>
                        
                </form>
            </section>
        </main>
    )
}
