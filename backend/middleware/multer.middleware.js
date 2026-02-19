import multer from "multer"

const storageOptions = multer.memoryStorage()

const upload = multer({storage: storageOptions,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
            cb(null, true)
        }
        else{
            cb(new Error("Invalid file type"))
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})

export default upload