import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
const emailValidator = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [errors, setErrors] = useState({})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const {login} = useAuth()

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
            const res = await login(formData)
            console.log(res)
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
        <main className={`h-screen flex justify-center items-center`}>
            <div>
                <form noValidate className='flex flex-col border border-gray-400 rounded-md p-10 items-center' onSubmit={handleSubmit}>
                    <h2 className='text-center text-xl mb-4'>Login</h2>
                    {(msg.success || msg.err) && <p className={`${msg.success ? "text-green-600" : "text-red-600"} mb-2`}>{msg.success || msg.err}</p>}

                    <input 
                        type='email' 
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='my-2 p-3 w-75 border border-zinc-500 rounded-sm'
                        placeholder='Enter your email'/>
                    {errors.email && (<p className='text-red-500 my-2 self-start ml-3'>{errors.email}</p>)}

                    <input 
                        type="password" 
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='my-2 p-3 w-75 border border-zinc-500 rounded-sm'
                        placeholder='Enter password'/>
                    {errors.password && (<p className='text-red-500 my-2 self-start ml-3'>{errors.password}</p>)}

                    <button type='submit' className='bg-red-900 px-3 py-2 rounded-md mt-4 hover:bg-red-800 text-white'>Login</button>
                    <p className="mt-5 text-zinc-400">
                        Don't have an account?{" "}
                        <span className="text-red-900 underline hover:text-white">
                        <Link to="/register">Sign Up</Link>
                        </span>{" "}
                        now.
                    </p>
                </form>
            </div>
        </main> 
    )
}
