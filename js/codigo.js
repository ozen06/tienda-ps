/* ==========================================================================
   1. VARIABLES GLOBAL / ESTADO DE LA APLICACIÓN
   ========================================================================== */
// Datos estáticos o configuraciones
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

// Estado dinámico de la app (variables que cambian con la interacción del usuario)
const datos = [[], [], [], []];
let contadorCarrito = 0;

/* ==========================================================================
   2. SELECCIÓN DE ELEMENTOS DEL DOM (Nodos HTML)
   ========================================================================== */
// Agrupá todos los document.getElementById o querySelector acá arriba
const inventario = document.getElementById('EymrNHzbVl')
const listaGeneros = document.getElementById('f-generos');
const listaPrecio = document.getElementById('f-precio');
const listaPlataforma = document.getElementById('f-plataforma');
const carrito = document.getElementById('Carrito');

/* ==========================================================================
   3. LOGICA PRINCIPAL / RENDERIZADO (Funciones que dibujan en pantalla)
   ========================================================================== */
// Función encargada exclusivamente de pintar las tarjetas en el HTML
function tarjetas(datos) {
  for (let i = 0; i < 2; i++) {
    const nombre = datos[0][i];
    const precio = datos[2][i];
    const plataforma = datos[3][i];
    inventario.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="cards-steam overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
                    <div class="d-flex justify-content-center align-items-center">
                        <img class="w-50 img-fluid" src="../img/plataformas/steam-1.svg" alt="Steam">
                    </div>
                    <div class="d-flex justify-content-center align-items-center my-2">
                        <img class="rounded-2 w-100 img-fluid" src="../img/juegos/${nombre}.svg" alt="${nombre}">
                    </div>
                    <p class="fs-5 text-white fw-bold m-0 text-start">${nombre}</p>
                    <button class="rounded btn btn-outline-secondary text-decoration-none" color>
                        <p class="fs-4 text-info fw-semibold m-0 text-center btn-compra">${'$' + precio}</p>
                    </button>
                </div>
            </div>
    `;
  }
}

function filtros(datos) {
  datos[1].forEach((elemento) => {
    listaGeneros.innerHTML += `
        <li><label class="dropdown-item"><input type="checkbox" value="${elemento}"> ${elemento}</label></li>
    `;
  })
  datos[2].forEach((elemento) => {
    listaPrecio.innerHTML += `
        <li><label class="dropdown-item"><input type="checkbox" value="${elemento}"> ${elemento}</label></li>
    `;
  })
  datos[3].forEach((elemento) => {
    listaPlataforma.innerHTML += `
        <li><label class="dropdown-item"><input type="checkbox" value="${elemento}"> ${elemento}</label></li>
    `;
  })
}

/* ==========================================================================
   4. FUNCIONES AUXILIARES / FILTRADO / MANEJO DE ESTADO
   ========================================================================== */
// Lógica pura de negocios (filtrar datos, cálculos matemáticos, etc.)

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

/* ==========================================================================
   5. ESCUCHADORES DE EVENTOS (Event Listeners)
   ========================================================================== */
// Captura de clics, inputs, envíos de formularios. Van al final porque llaman a las funciones de arriba.


inventario.addEventListener('click', (event) => {
  if (event.target.closest('.btn-compra')) {
    contadorCarrito += 1;
    carrito.innerText = contadorCarrito;
  }
});

/* botonCarrito.addEventListener('click', () => {
    console.log("Abriendo carrito...");
});
// Ejemplo para capturar los filtros (usando delegación de eventos o listeners individuales)
dropdownGeneros.addEventListener('change', (e) => {
    const generoSeleccionado = e.target.value;
    // Ejecuta lógica de filtrado y vuelve a renderizar
}); */

/* ==========================================================================
   6. INICIALIZACIÓN DE LA APLICACIÓN (Punto de arranque)
   ========================================================================== */
// Código que se ejecuta apenas se termina de cargar la página para que la tienda no empiece vacía
document.addEventListener('DOMContentLoaded', () => {
  tarjetas(datos);
  filtros(datos);
});