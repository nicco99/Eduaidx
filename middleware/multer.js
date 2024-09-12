const multer = require('multer')

const upload = multer({"dest": "/uploads"})

const uploadSingleFile =(file)=>{
    return upload.single(file)
}

const uploadMultipleFiles = (files)=>{
    return upload.multiple(files)
}

module.exports = {uploadSingleFile,uploadMultipleFiles}