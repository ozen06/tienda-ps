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
}, 2000);

//Agrandar imagenes index dinamicamente.

const contenedor = document.querySelector("div");
const personajes = ["ellie", "kratos", "crash", "sackboy"];

contenedor.addEventListener("mouseover", () => {
  const elemento1 = String(event.target.className);
  for (const pj of personajes) {
    if (elemento1.indexOf(pj) > 0) {
      const imagenes = Array.from(contenedor.children).find((elemento) => elemento.classList.contains(pj));
      imagenes.classList.add('ancho-img');
      let salida = 1;
      compuerta(imagenes, elemento1, salida);
      salida = 0;
    }
  }
})
function compuerta(imagenes, elemento1, salida) {
  if (salida !== 0) {
    contenedor.addEventListener("mouseout", () => {
      imagenes.classList.remove('ancho-img');
    })
  }
}

