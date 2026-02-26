import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
const SALT_ROUNDS = 10

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.status(200).json({msg:"User Info", user})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error.message})
    }
}

export const getUserInfoById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        
        res.status(200).json({msg:"User Info", user})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error.message})
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {username, bio} = req.body;

        const updates = {}
        
        if(bio){
            updates.bio = bio
        }
        if(username){
            updates.username = username
        }

        if(req.file){
            const basePath = Buffer.from(req.file.buffer).toString("base64");
    
            const fileURI = `data:${req.file.mimetype};base64,${basePath}`
    
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: "avatar",
                public_id: req.file.filename,
                resource_type: "auto"
            })
            updates.avatar = result.secure_url
        }

        const user = await User.findByIdAndUpdate(req.user.id, {
            ...updates,
            // avatar: result.secure_url,
        });

        res.status(200).json({msg: "Profile upated successfully", updates})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: error.message})
    }
}

export const followUser = async (req, res) => {
    try{

        const user = await User.findById(req.user.id);
    
        const {id} = req.params;
        
        const author = await User.findById(id)
        console.log(author.followers)
        console.log(user)
    
        if(!author){
            return res.status(404).json({msg: "User not found."})
        }
    
        const follows = author.followers.includes(req.user.id);
    
        if(follows){
            author.followers.pull(req.user.id)
            user.following.pull(id)
        }
        else{
            author.followers.push(req.user.id)
            user.following.push(id)
        }
        await author.save()
        await user.save()
        res.status(200).json({msg: "Successful"})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: error.message})
    }
        
}