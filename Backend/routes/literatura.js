const rutas = require('express').Router()

rutas.get('/delete', (res, rep) => {
  let ObjetoEnvio = {
    datoA: 'Esto es el dato A del Json',
    datoB: 'Esto es el dato B del json'
  }
  rep.status(200).json(ObjetoEnvio)
})
rutas.post('/', (res, rep) => {
  let ObjetoEnvio = {
    datoA: 'Esto es el dato A del Json',
    datoB: 'Esto es el dato B del json'
  }
  rep.status(200).json(ObjetoEnvio)
})

module.exports = rutas
