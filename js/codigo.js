
//Cambio de texto central cada 5s. 

let texto = document.getElementsByClassName("texto-centro")
let textoNuevo = ["Hola", "Q onda"];
setInterval(() => {
  let posicion = 0;
  if (texto[0]) {
    if (texto[0].innerText === textoNuevo[posicion]) {
      texto[0].innerText = textoNuevo[posicion + 1];
    } else if (texto[0].innerText === textoNuevo[posicion + 1]) {
      texto[0].innerText = "No es una simple tienda, es una experiencia.";
    } else {
      texto[0].innerText = textoNuevo[posicion];
    }
  }
}, 5000);

//Agrandar imagenes index dinamicamente.

// This handler will be executed every time the cursor
// is moved over a different list item
const contenedor = document.querySelector("div");
const personajes = ["ellie", "kratos", "crash", "sackboy"];
contenedor.addEventListener("mouseover", () => {
  const elemento1 = String(event.target.className);
  for (const pj of personajes){
    if (elemento1.indexOf(pj) > 0){
    const imagenes = Array.from(contenedor.children).find((elemento) => elemento.classList.contains(pj));
    imagenes.classList.add('w-50');
  }
  }
});
/* contenedor.addEventListener("mouseenter", () => {
  const elemento1 = String(event.target);
  console.log(elemento1)
  for (const pj of personajes){
    if (elemento1.indexOf(pj) > 0){
    const imagenes = Array.from(contenedor.children).find((elemento) => elemento.classList.contains(pj));
    console.log(imagenes)
  }
  }
}); */