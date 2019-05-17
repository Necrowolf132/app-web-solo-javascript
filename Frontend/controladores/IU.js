import EnvioLibros from './../servicios/librosServicios'

class IU {
  constructor () {
    this.enviador = new EnvioLibros()
  }

  async RenderizarLibros () {
    const LibosGet = await this.enviador.tomarlibro().then(
      (Retorno) => {
        console.log(Retorno)
        if (Retorno.status == 'ok' && Retorno.estatusNum == 1) {
          return Retorno.datoEnviados
        } else {
          return []
        }
      }
    ).catch((error) => {
      console.log('Error, probablemente servidor caido', error)
    })
    console.log(LibosGet)
    const mostrarLibrocontainer = document.getElementById('Mostrar-Libro')
    mostrarLibrocontainer.innerHTML = ''
    LibosGet.forEach(libro => {
      const DIV = document.createElement('div')
      DIV.className = ''
      DIV.innerHTML = 
        <div class="card m-2 ">
            <div class="row">
               <div class="col-md-4">
                  <img src="$(libro.)">
               </div>
               <div class="col-md-8">
              </div>
            </div> 
        </div>
      
    })
  }

  async AgregarLibro (Libro) {
    await this.enviador.guardarLibro(Libro).then(
      (retorno) => {
        console.log(retorno)
        if (retorno.status == 'ok' && retorno.estatusNum == 1) {
          this.LimpiarFormulario()
        } else {}
      }).catch((error) => {
      console.log('Error, probablemente servidor caido', error)
    })
  }

  LimpiarFormulario () {
    document.getElementById('formulario-libros').reset()
  }

  LanzarMensage () {}

  BorrarLibro () {}
}

export default IU
