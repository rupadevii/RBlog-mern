import multer from "multer"

const storageOptions = multer.memoryStorage()

export const upload = multer({storage: storageOptions,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            cb(null, true)
        }
        else{
            cb(new Error("Invalid file type"))
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export const postUpload = multer({storage: storageOptions,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            cb(null, true)
        }
        else{
            cb(new Error("Invalid file type"))
        }
    },
    limits: {
        fileSize: 30 * 1024 * 1024
    }
})

