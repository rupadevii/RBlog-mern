import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import axios from 'axios';
import { login } from '../redux/features/authSlice';
import { useTheme } from '../context/ThemeContext';
const emailValidator = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {theme} = useTheme()
    
    const color = theme === "dark" ? "text-white" : "text-black"
 
    function handleChange(e){
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name] : value}))
        setMsg({})
        let error = ""

        if(value){
            if(name==="email" && !emailValidator.test(value)){
                error = "Enter valid email."
            }
            
            if(name==="password" && value.length < 8){
                error = "Enter valid password."
            }
        }

        setErrors((prev) => ({...prev, [name]: error}))
    }

    async function handleSubmit(e){
        e.preventDefault()

        let error = {}
        for(let key in formData){
            if(!formData[key]) error[key] = `${key[0].toUpperCase()+key.slice(1)} is required`
        }
        
        if(Object.keys(error).length>0){
            setErrors(error)
            return
        }
        
        try{
            const res = await axios.post(`/api/auth/login`, formData, {
                withCredentials: true
            })
            dispatch(login({user: res.data.user}))
            setMsg({success: "Logged in successfully!"})
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }
        catch(error){
            console.error(error.response.data.msg)
            if(error.response.data.msg){
                setMsg({err: error.response.data.msg})
            }
        }
    }

    return (
        <main className='h-screen flex justify-center items-center'>
            <div>
                <form noValidate className="flex flex-col border-2 rounded-md p-10 px-12 items-center shadow-xl" onSubmit={handleSubmit}>
                    <h2 className='text-center text-2xl mb-4'>Login</h2>
                    {(msg.success || msg.err) && <p className={`${msg.success ? "text-green-600" : "text-red-600"} mb-2`}>{msg.success || msg.err}</p>}

                    <input 
                        type='email' 
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className="my-2 p-3 w-75 border-2 rounded-sm"
                        placeholder='Enter your email'/>
                    {errors.email && (<p className='text-red-500 my-2 self-start ml-3'>{errors.email}</p>)}

                    <input 
                        type="password" 
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className="my-2 p-3 w-75 border-2 rounded-sm"
                        placeholder='Enter password'/>
                    {errors.password && (<p className='text-red-500 my-2 self-start ml-3'>{errors.password}</p>)}

                    <button type='submit' className='bg-red-900 px-3 py-2 rounded-md mt-4 hover:bg-red-800 text-white'>Login</button>
                    <p className={`mt-5 ${color}`}>
                        Don't have an account?{" "}
                        <span className={`text-red-900 underline ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}>
                        <Link to="/register">Sign Up.</Link>
                        </span>
                    </p>
                </form>
            </div>
        </main> 
    )
}
