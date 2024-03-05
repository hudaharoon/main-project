const multer = require('multer')


// storage
//it has 2 keys ,1st one is destination 7 2ND ONE IS THE FILE NAME
///DESTINATION:whwre the file is stored
//filenemae :name in which file is stored

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true)
    }
    else {
        callback(null, false)
        return callback(new ErrorEvent("only png,jpeg,jpg files are allowded"))
    }
}
const multerConfig = multer({
    storage,
    fileFilter
})
module.exports = multerConfig;