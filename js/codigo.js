//Base de datos de productos
const products = [
  // --- STEAM ---
  { Nombre: "GTA 5", Precio: 5, Genero: "Accion", Plataforma: "Steam" },
  { Nombre: "Cyberpunk 2077", Precio: 30, Genero: "RPG / Accion", Plataforma: "Steam" },

  // --- PSN ---
  { Nombre: "The Last of Us Part I", Precio: 70, Genero: "Aventura", Plataforma: "PSN" },
  { Nombre: "God of War Ragnarok", Precio: 60, Genero: "Accion", Plataforma: "PSN" },

  // --- EPIC GAMES ---
  { Nombre: "Alan Wake 2", Precio: 50, Genero: "Terror", Plataforma: "Epic" },
  { Nombre: "Red Dead Redemption 2", Precio: 40, Genero: "Accion / Aventura", Plataforma: "Epic" },

  // --- XBOX ---
  { Nombre: "Halo Infinite", Precio: 40, Genero: "Shooter", Plataforma: "Xbox" },
  { Nombre: "Forza Horizon 5", Precio: 45, Genero: "Carreras", Plataforma: "Xbox" }
];

const datos = [[], [], [], []];
ordenamiento(datos[0], "Nombre");
ordenamiento(datos[1], "Genero");
ordenamiento(datos[2], "Precio");
ordenamiento(datos[3], "Plataforma");
function ordenamiento(arreglo, propiedad) {
  products.map((elemento) => {
    const actual = elemento[propiedad];
    const borrar = arreglo.findIndex((elemento) => elemento == actual);
    if (borrar === -1) {
      if (typeof actual == "string") {
        arreglo.push(actual);
      } else if (typeof actual == "number") {
        arreglo.push(actual);
        arreglo.sort(function (a, b) {
          return a - b;
        });
      }
    }
  });
}
/* const inventario = document.getElementById('EymrNHzbVl')
document.body.onload = addElement;
function addElement() {
  for (let i = 0; i < 2; i++) {
    var newDiv = document.createElement("div");
    var newContent = document.createElement("img");
    newContent.src = `../img/juegos/${datos[0][i]}.svg`;
    newContent.classList = "d-flex justify-content-center";1
    newDiv.appendChild(newContent); //añade img al div creado.

    // añade el elemento creado y su contenido al DOM
    inventario.appendChild(newDiv); //añade div con img
  }
} */