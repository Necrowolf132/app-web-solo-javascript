class EnvioLibros {
  constructor () {
    if (process.env.NODE_ENV != 'production') {
      console.log(process.env.NODE_ENV)
      this.URI = 'http://localhost:8080/api/libros'
    } else {
      this.URI = 'https://api-rest-docker.herokuapp.com/api/libros'
    }
  }
  async tomarlibro () {
    let Datosrespuesta = await fetch(this.URI)
    Datosrespuesta = await Datosrespuesta.json()
    return Datosrespuesta
  }
  async guardarLibro (myObjetEnvio) {
    let RespuestaGuardado = await fetch(this.URI, {
      method: 'POST',
      body: myObjetEnvio
    })
    RespuestaGuardado = await RespuestaGuardado.json()
    return RespuestaGuardado
  }
  async BorrarLibro (IDLibro) {
    let RespuestaBorrado = await fetch(`${this.URI}/${IDLibro}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'

    })
    RespuestaBorrado = await RespuestaBorrado.json()
    return RespuestaBorrado    
  }
}
export default EnvioLibros