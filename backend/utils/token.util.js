import jwt from "jsonwebtoken"

export const generateToken = (payload, expires_in="1d") => {
    if(Object.keys(payload).length === 0){
        throw new Error("Payload cannot be empty.")
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expires_in
    })

    return token
}

export const verifyToken = (token) => {
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY)
    return decoded;
}