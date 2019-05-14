import './css/boostrap.css'
import './css/animate.css'
import './css/styles.css'
import './img/logoApp.png'
import { RegistroLibro } from './controladores/RegistroLibro'

document.getElementById('formulario-libros').addEventListener( 'submit', RegistroLibro)
