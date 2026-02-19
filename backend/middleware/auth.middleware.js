import { verifyToken } from "../utils/token.util.js";

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.auth_token_cookie;
    
        if(!token){
            return res.status(401).json({msg: "No token provided."})
        }
    
        const decoded = verifyToken(token)
    
        if(!decoded){
            return res.status(401).json({msg: "Invalid token"})
        }
    
        req.user = decoded;
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

export default authMiddleware