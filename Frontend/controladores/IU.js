import EnvioLibros from './../servicios/librosServicios'
import  {format}   from 'timeago.js'

class IU {
  constructor () {
    this.enviador = new EnvioLibros()
    this.mostrarLibrocontainer = document.getElementById('Mostrar-Libro')
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
      console.log('Error, probablemente servidor caido, o error en al metodo del then', error)
      this.LanzarMensage('Error, probablemente servidor caido, o error en al metodo del then', 'danger', 6000)
    })
    console.log(LibosGet)
    this.mostrarLibrocontainer.innerHTML = ''
    LibosGet.forEach(libro => {
      const DIV = document.createElement('div')
      DIV.className = 'DivRecividor'
      DIV.innerHTML =` 
        <div class="card m-2 ">
            <div class="row">
               <div class="col-md-4">
                  <img src="${libro.image}" class="img-fluid" />
               </div> 
             <div class="col-md-8">
                <div class="card-block p-3">
                  <h3>Titulo:</h3>
                  <h4 class="card-title">${libro.titulo}</h4>
                  <div class="row">
                     <div class="col-md-6">
                        <h3>Autor:</h3>
                        <p class="card-text">${libro.autor}</p>
                      </div>
                     <div class="col-md-6">
                        <h3>Codigo:</h3>
                        <p class="card-text">${libro.isbn}</p>
                     </div>
                  </div>
                  <a href="#" class="btn btn-danger delete mt-3" _id="${libro._id}">Borrar</a>
                </div> 
            </div>
            </div>
            <div class="card-footer">
               ${format(libro.dato_creado)}
            </div> 
        </div>`;
        this.mostrarLibrocontainer.appendChild(DIV)      
    })
  }

  async AgregarLibro (Libro) {
    await this.enviador.guardarLibro(Libro).then(
      (retorno) => {
        console.log(retorno)
        if (retorno.status == 'ok' && retorno.estatusNum == 1) {
          this.LimpiarFormulario()
          this.agregarUltimoLibro(retorno.datoEnviados)
          this.LanzarMensage('Se agrego un nuevo libro', 'success', 6000)
        } else {
            if(retorno.statusNum == 2 && retorno.status == 'error guardado') {
              this.LanzarMensage('Error en el servidor, la consulta no se realizo adecuadamente', 'danger', 6000)
            } else if (retorno.estatusNum == 3 && retorno.status == 'Imagen muy pesada' ) {
              this.LanzarMensage('La imagen que intenta guardar es muy pesada, intente con una mas pequeña', 'danger', 6000)
            } else if (retorno.estatusNum == 3 && retorno.status == 'algun otro error con multer' ) {
              this.LanzarMensage('Fallo el guardado de la imagen en el servidor', 'danger', 6000)
            } else {
              this.LanzarMensage('Error desconocido no se pudo guardar', 'danger', 6000)
            }
        }
      }).catch((error) => {
        this.LanzarMensage('Error, probablemente servidor caido, o error en al metodo del then', 'danger', 6000)
      console.log('Error, probablemente servidor caido, o error en al metodo del then', error)
    })
  }
  
  async BorrarLibro (ObjetoBorrar) {
    ObjetoBorrar.className += ' disabled'
    await this.enviador.BorrarLibro(ObjetoBorrar.getAttribute('_id')).then(
      (retorno) => {
        console.log(retorno)
        if (retorno.status == 'ok' && retorno.estatusNum == 1) {
          this.borrarUltimoLibro(ObjetoBorrar)
          this.LanzarMensage('Se borro satisfactoriamente', 'success', 6000)
        } else {
          if(retorno.statusNum == 2 && retorno.status == 'error dorrado') {
            this.LanzarMensage('Error en el servidor, el borrado no se realizo adecuadamente', 'danger', 6000)
          } else {
            this.LanzarMensage('Error desconocido no se pudo borrar', 'danger', 6000)
          } 
      }
      }).catch((error) => {
        this.LanzarMensage('Error, probablemente servidor caido, o error en al metodo del then', 'danger', 6000)
      console.log('Error, probablemente servidor caido, o error en al metodo del then', error)
    })
  }
  
  agregarUltimoLibro(ObjetoLibro){
    const DIV = document.createElement('div')
    DIV.className = 'fadeInRight animated'
    DIV.innerHTML =` 
    <div class="card m-2 ">
    <div class="row">
       <div class="col-md-4">
          <img src="${ObjetoLibro.image}" class="img-fluid" />
       </div> 
     <div class="col-md-8">
        <div class="card-block p-3">
          <h3>Titulo:</h3>
          <h4 class="card-title">${ObjetoLibro.titulo}</h4>
          <div class="row">
             <div class="col-md-6">
                <h3>Autor:</h3>
                <p class="card-text">${ObjetoLibro.autor}</p>
              </div>
             <div class="col-md-6">
                <h3>Codigo:</h3>
                <p class="card-text">${ObjetoLibro.isbn}</p>
             </div>
          </div>
          <a href="#" class="btn btn-danger delete mt-3" _id="${ObjetoLibro._id}">Borrar</a>
        </div> 
    </div>
    </div>
      <div class="card-footer">
         ${format(ObjetoLibro.dato_creado)}
      </div> 
    </div>`;
      this.mostrarLibrocontainer.insertBefore(DIV, this.mostrarLibrocontainer.firstElementChild)
      const nuevo =  DIV.getElementsByClassName('delete')
      nuevo[0].addEventListener("click", (event) => {
        event.preventDefault()
         this.BorrarLibro(event.target);
        })
  }

  async borrarUltimoLibro(BotonBorrar){
    const padrePrincipal = BotonBorrar.parentNode.parentNode.parentNode.parentNode.parentNode;
    padrePrincipal.className += ' flipOutY animated' 
    setTimeout ( () => { this.mostrarLibrocontainer.removeChild(padrePrincipal)} , 1000);
    return await padrePrincipal
  }

  LimpiarFormulario () {
    document.getElementById('formulario-libros').reset()
  }
  
  LanzarMensage (Mensaje, Tipo, Tiempo) {
    const DIV = document.createElement('div')
    DIV.className = `alert alert-${Tipo} bounceIn animated`
    DIV.appendChild(document.createTextNode(Mensaje))
    
    const contenedor = document.querySelector('.contenedor-mensaje')
    const formulario = document.querySelector('#formulario-libros')
    contenedor.insertBefore(DIV, formulario)
    setTimeout(() => {
      DIV.classList.remove('bounceIn')
      DIV.className += '  bounceOut'
      setTimeout(() => {
        contenedor.removeChild(DIV)
      },700)
    }, Tiempo)
  }

}

export default IU
