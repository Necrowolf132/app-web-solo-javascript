const archivador = require('multer')
const path = require('path')

const almacen = archivador.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname).toLowerCase())
  }
})
const MyStorage = archivador({ storage: almacen, limits: { fileSize: 1000000 } }).single('image')
module.exports = MyStorage