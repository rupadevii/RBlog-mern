import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/token.util.js";
const SALT_ROUNDS = 10

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({msg: "Required details are missing"})
        }

        const userExists = await User.findOne({email: email})

        if(userExists){
            return res.status(400).json({msg: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(200).json({msg: "User created successfully"})
    } catch (error) {
        console.error(error.message)
        res.status(400).json({msg: error.message})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({msg: "Required details are missing."})
        }
    
        const user = await User.findOne({email: email});
    
        if(!user){
            return res.status(400).json({msg: "User does not exist."})
        }
    
        const match = await bcrypt.compare(password, user.password);
    
        if(!match){
            return res.status(400).json({msg: "Invalid credentials"})
        }

        const token = generateToken({
            username: user.username,
            email: user.email,
            id: user._id
        })

        res.cookie("auth_token_cookie", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        })

        // res.status(200).json({msg: "User logged in successfully.", token})
        res.status(200).json({msg: "User logged in successfully."})
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({msg: error.message})
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie("auth_token_cookie");
        res.status(200).json({msg: "Logged out successfully."})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: error.message})
    }
}