import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
    try {
        const {postId} = req.params;

        const comments = await Comment.find({post : postId});

        if(!comments){
            return res.status(404).json({msg: "No comments found."})
        }

        res.status(200).json({msg: "Comments", comments})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const {content, post} = req.body;
        const user = req.user.id;
        
        if(!content || !post){
            return res.status(400).json({msg: "Required info is missing."})
        }

        const newComment = await Comment.create({
            content,
            post,
            user
        })

        res.status(201).json({msg: "Comment added successfully.", newComment})

    } catch (error) {
        console.error(error)
        res.status(500).json({msg: error.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if(!deletedComment){
            return res.status(404).json({msg: "Comment not found."})
        }

        res.status(200).json({msg: "Comment Deleted successfully"})
    } catch (error) {
        console.error;
        res.status(500).json({msg: error.message})
    }
}