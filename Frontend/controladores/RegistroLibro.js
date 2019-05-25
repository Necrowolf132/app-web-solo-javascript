
export function RegistroLibro (event, UI) {
  event.preventDefault()
  const titulo = document.getElementById('titulo')
  const autor = document.getElementById('autor')
  const isbn = document.getElementById('isbn')
  const image = document.getElementById('image')
  let myObjetEnvio = {
    titulo: titulo.value,
    autor: autor.value,
    isbn: isbn.value,
    image: image.files
  }
  const formularioLibro = new FormData()
  formularioLibro.append('image', myObjetEnvio.image[0])
  formularioLibro.append('titulo', myObjetEnvio.titulo)
  formularioLibro.append('autor', myObjetEnvio.autor)
  formularioLibro.append('isbn', myObjetEnvio.isbn)

  UI.AgregarLibro(formularioLibro)
}
