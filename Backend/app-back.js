
if (process.env.NODE_ENV == 'desarrollo') {
  require('dotenv').config()
}

const express = require('express')
const loguer = require('./loguer')
const CORS = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const rutaLibros = require('./routes/literatura')
const BaseDatos = require('./database')
// const archivador = require('multer');

// inicializacion del backend
const myapp = express()
// parametros de configuracion del servidor

myapp.set('port', process.env.PORT)

// middlewares
myapp.use(CORS())
// implmentanndo archivador de imagenes
myapp.use(bodyParser.json()) // pyara info del cuerpo tipo application/json
myapp.use(bodyParser.urlencoded({ extended: false })) // par info del cuerpo tipo application/x-www-form-urlencoded

myapp.use(loguer(':remote-addr -> :remote-user -> [:date[clf]] -> :method :url HTTP/:http-version" :status', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Header:[:date[clf]]= { :res-header }', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Body:[:date[clf]]= :res-body', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Parametros:[:date[clf]]= :res-params', { stream: loguer.stream }))
myapp.use(loguer('Respo-Info-Resto:[:date[clf]]= :req[content-length] :referrer :user-agent', { stream: loguer.stream }))

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
