import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
const SALT_ROUNDS = 10

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({msg:"User Info", data: user})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error.message})
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {username, password, bio} = req.body;

        const updates = {}
        if(password){
            updates.password = await bcrypt.hash(password, SALT_ROUNDS) 
        }
        if(bio){
            updates.bio = bio
        }
        if(username){
            updates.username = username
        }

        const basePath = Buffer.from(req.file.buffer).toString("base64");

        const fileURI = `data:${req.file.mimetype};base64,${basePath}`

        const result = await cloudinary.uploader.upload(fileURI, {
            folder: "avatar",
            public_id: req.file.filename,
            resource_type: "auto"
        })

        const user = await User.findByIdAndUpdate(req.user.id, {
            ...updates,
            avatar: result.secure_url,
        });

        user.avatar = result.secure_url;
        await user.save()

        res.status(200).json({msg: "Profile upated successfully", path: result.secure_url})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: error.message})
    }
}