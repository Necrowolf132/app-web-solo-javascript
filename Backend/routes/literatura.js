const rutas = require('express').Router()
const modelosLibros = require('../models/libros')

//metodo para Visualizar los  registro

rutas.get('/', async (res, rep) => {
  let ObjetoEnvio = {
    status: 'ok',
    datosLibros: []
  }
  try {
    const retorno  =  await  modelosLibros.find()
    ObjetoEnvio.datosLibros = retorno
    rep.status(200).json(ObjetoEnvio)
  } catch {
    console.log('Error inisperado en la consulta api libros get')
    ObjetoEnvio.status = 'error consulta'
    rep.status(503).json(ObjetoEnvio)
  }
})

//metodo para Crear nuevo registro

rutas.post('/', async (res, rep) => {
  let ObjetoEnvio = {
    status: 'ok',
    datoEnviados: {}
  }
  const nombreimage = res.file.filename
  console.log('---------------->',res.body.titulo)
  console.log('---------------->',nombreimage)
   try {
     const retorno =  new modelosLibros(res.body)
     await retorno.save()
     ObjetoEnvio.datoEnviados = retorno
  } catch {
    console.log('Error inisperado en el guardado  api libros post')
    ObjetoEnvio.status = 'error guardado'
  }
  rep.status(200).json(ObjetoEnvio)
})

//Metodo para eliminar Regitros 

rutas.delete('/:id', async (res, rep) => {
  let ObjetoEnvio = {
    status: 'ok',
    datoEnviados: {}
  }
  try {
    const retorno = await  modelosLibros.findByIdAndDelete(res.params.id);
    ObjetoEnvio.datoEnviados = retorno 
  } catch {     
    console.log('Error inisperado en el dorrado  api libros Delete')
    ObjetoEnvio.status = 'error dorrado'
  }
  rep.status(200).json(ObjetoEnvio)
})

module.exports = rutas
