const { Schema, model } = require('mongoose')

const esquemaLibros = Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, required: true },
  image: { type: String },
  dato_creado: { type: Date, default: Date.now }

})

module.exports = model('libros', esquemaLibros)
