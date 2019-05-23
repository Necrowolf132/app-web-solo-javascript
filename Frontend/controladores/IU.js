import EnvioLibros from './../servicios/librosServicios'
import  {format}   from 'timeago.js'

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
      DIV.innerHTML =` 
        <div class="card m-2 ">
            <div class="row">
               <div class="col-md-4">
                  <img src="${libro.image}" class="img-fluid" />
               </div> 
               <div class="col-md-8">
                  <div class="card-block px-2">
                  <h4 class="card-title">${libro.titulo}</h4>
                  <p class="card-text">${libro.autor}</p>
                  <a href="#" class="btn btn-danger delete" _id="${libro._id}">Borrar</a>
                  </div> 
              </div>
            </div>
            <div class="card-footer">
               ${format(libro.dato_creado)}
            </div> 
        </div>`;
        mostrarLibrocontainer.appendChild(DIV)      
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
