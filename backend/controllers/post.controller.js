import cloudinary from "../config/cloudinary.config.js"
import Post from "../models/post.model.js"
import Comment from "../models/comment.model.js"

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({}).populate("author", "username").sort({createdAt: -1})

        res.status(200).json({msg: "Posts", posts})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createPost = async (req, res) => {
    try {
        const {title, content} = req.body;

        const post = {}

        post.title = title;
        post.content = content;
        
        if(req.file){
            const basePath = Buffer.from(req.file.buffer).toString("base64");

            const fileURI = `data:${req.file.mimetype};base64,${basePath}`
    
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: "posts",
                public_id: req.file.filename,
                resource_type: "auto"
            })

            post.image = result.secure_url
        }
        
        const newPost = await Post.create({
            ...post,
            author: req.user.id,
        })

        res.status(201).json({msg: "Post created successfully", newPost})

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error.message})
    }
}

export const getPostById = async (req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id).populate("author", "username avatar");
        const comments = await Comment.find({post: id}).populate("user", "username avatar")
        
        if(!post){
            return res.status(404).json({msg: "Post not found."})
        }

        res.status(200).json({msg: "Post Details:", post, comments})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: error.message})
    }
}

export const getPostsByUserId = async (req, res) => {
    try{
        const {userId} = req.params;

        const posts = await Post.find({author:userId});
        
        if(posts.length===0){
            return res.status(404).json({msg: "Posts not found."})
        }

        res.status(200).json({msg: "Post Details:", posts})
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

export const editPost = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(req.file)
        const {title, content} = req.body;

        let updates = {};

        if(req.file){
            const basePath = Buffer.from(req.file.buffer).toString("base64");
            
            const fileURI = `data:${req.file.mimetype};base64,${basePath}`
    
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: "posts",
                public_id: req.file.filename,
                resource_type: "auto"
            })

            updates.result = result;
        }

        if(title) updates.title = title;
        if(content) updates.content = content;

        const post = await Post.findByIdAndUpdate(id, updates)

        res.status(200).json({msg: "Post updated successfully", post})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        await Post.findByIdAndDelete(id)

        res.status(200).json({msg: "Post deleted successfully"});

    } catch (error) {
        console.error(error)
        res.status(500).json({msg: error.message})
    }
}

export const likePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({msg: "Post not found"})
        }

        const isLiked = post.likes.includes(userId);

        if(isLiked){
            post.likes.pull(userId)
        }
        else{
            post.likes.push(userId)
        }
        await post.save()

        res.status(200).json({msg: "Post liked successfully.", post})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: error.message})
    }
}
