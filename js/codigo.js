//base de datos
const products = [
  // --- STEAM ---
  { Nombre: "GTA 5", Precio: 5, Categoria: "Accion", Plataforma: "Steam" },
  { Nombre: "Cyberpunk 2077", Precio: 30, Categoria: "RPG / Accion", Plataforma: "Steam" },

  // --- PSN ---
  { Nombre: "The Last of Us Part I", Precio: 70, Categoria: "Aventura", Plataforma: "PSN" },
  { Nombre: "God of War Ragnarok", Precio: 60, Categoria: "Accion", Plataforma: "PSN" },

  // --- EPIC GAMES ---
  { Nombre: "Alan Wake 2", Precio: 50, Categoria: "Terror", Plataforma: "Epic" },
  { Nombre: "Red Dead Redemption 2", Precio: 40, Categoria: "Accion / Aventura", Plataforma: "Epic" },

  // --- XBOX ---
  { Nombre: "Halo Infinite", Precio: 40, Categoria: "Shooter", Plataforma: "Xbox" },
  { Nombre: "Forza Horizon 5", Precio: 45, Categoria: "Carreras", Plataforma: "Xbox" }
];

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
const contenedor = document.querySelectorAll("div");
const imagenes = contenedor[0];
const personajes = ["ellie", "kratos", "crash", "sackboy"];
imagenes.addEventListener("mouseover", () => {
  const elemento = String(event.target.className);
  for (const pj of personajes) {
    if (elemento.indexOf(pj) > 0) {
      const imagen = Array.from(imagenes.children).find((elemento) => elemento.classList.contains(pj));
      imagen.classList.add('ancho-img');
      compuerta(imagenes, imagen, 'ancho-img');
    }
  }
})
const tienda = contenedor[2];
tienda.addEventListener("mouseover", () => {
  const elemento = String(event.target.className);
  if (elemento !== null) {
    const fondo = Array.from(tienda.children).find((elemento) => elemento.classList.contains("tienda"));
    console.log(fondo)
    fondo.classList.add('tienda-tamaño');
    compuerta(tienda, fondo, 'tienda-tamaño');
  }
})
function compuerta(evento, contenedor, clase) {
  evento.addEventListener("mouseout", () => {
    contenedor.classList.remove(clase);
  })
}