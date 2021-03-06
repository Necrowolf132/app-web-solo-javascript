const rutas = require('express').Router()
const modelosLibros = require('../models/libros')
const MyStorage = require('../Uploator')
const loguer = require('../loguer')
var multer = require('multer')
const {unlink} = require('fs-extra')
const patch = require('path')


var  ObjetoEnvio = {
  status: 'ok',
  estatusNum: 1,
  datoEnviados: []
}

rutas.use(MyStorage)

rutas.use( async (error, req, resp, next) => {
  if (error instanceof multer.MulterError && error.message == 'File too large') {
    loguer.MyLog.logError(error)
    ObjetoEnvio.status = 'Imagen muy pesada'
    ObjetoEnvio.estatusNum = 3
    ObjetoEnvio.datoEnviados = []
    resp.status(503).json(ObjetoEnvio).send()    
  } else if (error) {
    loguer.MyLog.write.logError(error)
    ObjetoEnvio.status = 'algun otro error con multer'
    ObjetoEnvio.estatusNum = 3
    ObjetoEnvio.datoEnviados = []
  resp.status(503).json(ObjetoEnvio).send()
  } else {
    next()
  }
})
 
//metodo para Visualizar los  registro

rutas.get('/', async (res, rep) => {
  try {
    const retorno  =  await  modelosLibros.find().sort({dato_creado: 'desc'})
    ObjetoEnvio.datoEnviados = retorno
    ObjetoEnvio.status = 'ok'
    ObjetoEnvio.estatusNum = 1
  } catch {
    loguer.MyLog.logError('Error inesperado en la consulta api libros get') 
    ObjetoEnvio.status = 'error consulta'
    ObjetoEnvio.estatusNum = 2
  }
  rep.status(200).json(ObjetoEnvio)
})

//metodo para Crear nuevo registro

rutas.post('/', async (res, rep) => {
  try {
     const ImagenPATH = 'uploads/' + res.file.filename;
     res.body.image = ImagenPATH
     const retorno =  new modelosLibros(res.body)
     await retorno.save()
     ObjetoEnvio.datoEnviados = retorno
     ObjetoEnvio.status = 'ok'
     ObjetoEnvio.estatusNum = 1
  } catch {
    loguer.MyLog.logError('Error inesperado en el guardado  api libros post')
    ObjetoEnvio.status = 'error guardado'
    ObjetoEnvio.estatusNum = 2
  }
  rep.status(200).json(ObjetoEnvio)
})

//Metodo para eliminar Regitros 

rutas.delete('/:id', async (res, rep) => {
  try {
    const retorno = await  modelosLibros.findByIdAndDelete(res.params.id);
    unlink(patch.resolve('./Backend/public/' + retorno.image))
      ObjetoEnvio.datoEnviados = retorno
    ObjetoEnvio.status = 'ok'
    ObjetoEnvio.estatusNum = 1 
  } catch { 
    loguer.MyLog.logError('Error inesperado en el dorrado  api libros Delete')
    ObjetoEnvio.status = 'error dorrado'
    ObjetoEnvio.estatusNum = 2
  }
  rep.status(200).json(ObjetoEnvio)
})

module.exports = rutas
