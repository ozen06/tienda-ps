/* ==========================================================================
   1. VARIABLES GLOBAL / ESTADO DE LA APLICACIÓN
   ========================================================================== */
// Datos estáticos o configuraciones
const products = [
  // --- STEAM ---
  { Nombre: "GTA 5", Precio: 5, Genero: "Accion", Plataforma: "Steam" },
  { Nombre: "Cyberpunk 2077", Precio: 30, Genero: ["RPG", "Accion"], Plataforma: "Steam" },

  // --- PSN ---
  { Nombre: "The Last of Us Part I", Precio: 70, Genero: "Aventura", Plataforma: "PSN" },
  { Nombre: "God of War Ragnarok", Precio: 60, Genero: "Accion", Plataforma: "PSN" },

  // --- EPIC GAMES ---
  { Nombre: "Alan Wake 2", Precio: 50, Genero: "Terror", Plataforma: "Epic" },
  { Nombre: "Red Dead Redemption 2", Precio: 40, Genero: ["Accion", "Aventura"], Plataforma: "Epic" },

  // --- XBOX ---
  { Nombre: "Halo Infinite", Precio: 40, Genero: "Shooter", Plataforma: "Xbox" },
  { Nombre: "Forza Horizon 5", Precio: 45, Genero: "Carreras", Plataforma: "Xbox" }
];

// Estado dinámico de la app (variables que cambian con la interacción del usuario)
const datos = [[], [], [], []];
const filtrosActivos = [];
let itemFiltrados = [];
let contadorCarrito = 0;

/* ==========================================================================
   2. SELECCIÓN DE ELEMENTOS DEL DOM (Nodos HTML)
   ========================================================================== */
// Agrupá todos los document.getElementById o querySelector acá arriba
const inventario = document.getElementById('EymrNHzbVl')
const filtros = document.getElementById('filtros');
const listaGeneros = document.getElementById('f-generos');
const listaPrecio = document.getElementById('f-precio');
const listaPlataforma = document.getElementById('f-plataforma');
const carrito = document.getElementById('Carrito');

/* ==========================================================================
   3. LOGICA PRINCIPAL / RENDERIZADO (Funciones que dibujan en pantalla)
   ========================================================================== */
// Función encargada exclusivamente de pintar las tarjetas en el HTML
function tarjetas(arreglo) {
  inventario.innerHTML = "";
  arreglo.forEach((elemento, indice) => {
    const nombre = elemento.Nombre;
    const precio = elemento.Precio;
    const plataforma = elemento.Plataforma;
    impresion(nombre, precio, plataforma);
  })
}

function impresion(nombre, precio, plataforma) {
  if (plataforma === 'Steam') {
    inventario.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
                    <div class="d-flex justify-content-center align-items-center">
                        <img class="w-50 img-fluid" src="../img/plataformas/steam-1.svg" alt="${plataforma}">
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
  } else if (plataforma === 'Epic') {
    inventario.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
                    <div class="d-flex justify-content-center align-items-center">
                        <img class="w-50 img-fluid" src="https://static.cdnlogo.com/logos/e/88/epic-games.svg" alt="${plataforma}">
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
  } else if (plataforma === 'PSN') {
    inventario.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
                    <div class="d-flex justify-content-center align-items-center">
                        <img class="w-50 img-fluid" src="https://static.cdnlogo.com/logos/p/56/playstation-and-wordmark.svg" alt="${plataforma}">
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
  } else if (plataforma === "Xbox") {
    inventario.innerHTML += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
                    <div class="d-flex justify-content-center align-items-center">
                        <img class="w-50 img-fluid" src="https://static.cdnlogo.com/logos/x/1/xbox.svg" alt="${plataforma}">
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

function filtrado(datos) {
  datos[1].forEach((elemento) => {
    listaGeneros.innerHTML += `
        <li><label class="dropdown-item"><input type="checkbox" value="${elemento}"> ${elemento}</label></li>
    `;
  })
  datos[2].forEach((elemento) => {
    listaPrecio.innerHTML += `
        <li><label class="dropdown-item"><input type="radio" name="precio-unico" value="${elemento}"> ${elemento}</label></li>
    `;
  })
  datos[3].forEach((elemento) => {
    listaPlataforma.innerHTML += `
        <li><label class="dropdown-item"><input type="radio" name="plataforma-unica" value="${elemento}"> ${elemento}</label></li>
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

console.log(products[1].Genero)

function ordenamiento(arreglo, propiedad) {
  products.map((elemento) => {
    const actual = elemento[propiedad];
    if (Array.isArray(elemento[propiedad])) {
      actual.forEach(genero => {
        const borrar = arreglo.findIndex((elemento) => elemento == genero);
        if (borrar === -1) {
          arreglo.push(genero);
        }
      })
    }
    const borrar = arreglo.findIndex((elemento) => elemento == actual);

    // accion
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

function comprobacion(propiedad) {
  let tipoPropiedad = "";
  datos[0].forEach(elemento => {
    if (elemento === propiedad) {
      tipoPropiedad = "Nombre"
    }
  })
  datos[1].forEach(elemento => {
    if (elemento === propiedad) {
      tipoPropiedad = "Genero"
    }
  })
  datos[2].forEach(elemento => {
    if (elemento === Number(propiedad)) {
      tipoPropiedad = "Precio"
    }
  })
  datos[3].forEach(elemento => {
    if (elemento === propiedad) {
      tipoPropiedad = "Plataforma"
    }
  })
  return tipoPropiedad
}

/* fetch('https://www.steamgriddb.com/api/v2')
  .then(response => response.json())
  .then(data => console.log(data)); */

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
filtros.addEventListener('click', (event) => {
  const elemento = event.target;
  if (elemento.tagName == "INPUT") {
    const actual = elemento.value;
    dato = comprobacion(actual);

    if(dato === "Plataforma"){
      filtrosActivos.forEach((elemento, indice) =>{
        if (comprobacion(elemento) === "Plataforma"){
          filtrosActivos.splice(indice, 1)
        }
      })
    } else if(dato === "Precio"){
      filtrosActivos.forEach((elemento, indice) =>{
        if (comprobacion(elemento) === "Precio"){
          filtrosActivos.splice(indice, 1)
        }
      })
    }

    const borrar = filtrosActivos.findIndex((elemento) => elemento == actual);
    if (borrar == -1) {
      filtrosActivos.push(actual);
    } else {
      filtrosActivos.splice(borrar, 1);
    }

    if (filtrosActivos.length === 0) {
      tarjetas(products);
      return;
    }

    itemFiltrados = products.filter(juego => {
      return filtrosActivos.every((filtro) => {
        dato = comprobacion(filtro)
        if (dato == "Genero") {
          return juego.Genero.includes(filtro)
        } else if (dato == "Precio") {
          return juego.Precio == Number(filtro)
        } else if (dato == "Plataforma") {
          return juego[dato] === filtro
        }
        return juego[dato] === filtro
      })
    });

    tarjetas(itemFiltrados)
  }
});
/* ==========================================================================
   6. INICIALIZACIÓN DE LA APLICACIÓN (Punto de arranque)
   ========================================================================== */
// Código que se ejecuta apenas se termina de cargar la página para que la tienda no empiece vacía
document.addEventListener('DOMContentLoaded', () => {
  tarjetas(products);
  filtrado(datos);
});