import './css/boostrap.css'
import './css/animate.css'
import './css/styles.css'
import './img/logoApp.png'
import { RegistroLibro } from './controladores/RegistroLibro'
import UI from './controladores/IU'

const MyUI = new UI()
document.addEventListener('DOMContentLoaded', () => {
  MyUI.RenderizarLibros()
})
document.getElementById('formulario-libros').addEventListener('submit', (event) => { RegistroLibro(event, MyUI) })
