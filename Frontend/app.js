import './css/boostrap.css'
import './css/animate.css'
import './css/styles.css'
import './img/logoApp.png'
import { RegistroLibro } from './controladores/RegistroLibro'
import UI from './controladores/IU'

const MyUI = new UI()
document.addEventListener('DOMContentLoaded', async () => {
  await MyUI.RenderizarLibros()
  const EventosBorrar = document.getElementById('Mostrar-Libro').getElementsByClassName('delete')
  for(let i = 0; i < EventosBorrar.length; i++) {
    EventosBorrar[i].addEventListener("click", function(event) {
     event.preventDefault()
      MyUI.BorrarLibro(event.target);
    })
}
})
document.getElementById('formulario-libros').addEventListener('submit', (event) => { RegistroLibro(event, MyUI) })
