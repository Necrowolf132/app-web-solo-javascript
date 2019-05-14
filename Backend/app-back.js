
if (process.env.NODE_ENV == 'desarrollo') {
  require('dotenv').config()
}

const express = require('express')
const loguer = require('./loguer')
const CORS = require('cors')
const archivador = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const rutaLibros = require('./routes/literatura')
const BaseDatos = require('./database')
// const archivador = require('multer');

// inicializacion del backend
const myapp = express()
const almacen = archivador.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})
// parametros de configuracion del servidor

myapp.set('port', process.env.PORT)

// middlewares
myapp.use(archivador({ almacen }).single('image')) // implmentanndo archivador de imagenes
myapp.use(bodyParser.json()) // pyara info del cuerpo tipo application/json
myapp.use(bodyParser.urlencoded({ extended: false })) // par info del cuerpo tipo application/x-www-form-urlencoded

myapp.use(loguer(':remote-addr -> :remote-user -> [:date[clf]] -> :method :url HTTP/:http-version" :status', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Header = { :res-header }', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Body = :res-body', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Parametros = :res-params', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Resto = :req[content-length] :referrer :user-agent', { stream: loguer.stream }))
myapp.use(CORS())

// rutas principales
myapp.use('/api/libros', rutaLibros)
myapp.get('/api/llegar', (resol, respon) => {
  respon.status(200).send('Llegar mas ' + myapp.get('port'))
})
myapp.post('/api/llegar', (resol, respon) => {
  respon.status(200).send('Llegar por POST mas ' + myapp.get('port'))
})
myapp.use('/', express.static(path.join(__dirname, 'public')))
// correr servidor

myapp.listen(myapp.get('port'), () => {
  console.log('Servidor corriendo por el puerto', myapp.get('port'))
})
