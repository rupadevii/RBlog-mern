/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true)
    const isAuthenticated = user !== null

    useEffect(() => {
        async function loadUser(){
            try {
                const res = await axios.get(`/api/user/profile`, {
                    withCredentials: true
                })
                setUser(res.data.user)
                console.log("Auth context invoked the api call")
            } catch (error) {
                console.log(error);
                setUser(null);
            }
            // finally{
            //     setLoading(false)
            // }
        }
        loadUser()
    }, [])


    async function login(data){
        const res = await axios.post(`/api/auth/login`, data, {
            withCredentials: true
        })
        setUser(res.data.user)
        return res
    }

    async function logout(data){
        const res = await axios.post(`/api/auth/logout`, data, {
            withCredentials: true
        })
        console.log(res)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
