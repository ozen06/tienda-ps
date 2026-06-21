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
const descuentos = [
  { Descuento: 33, juegos: [] },
  { Descuento: 50, juegos: [] },
  { Descuento: 75, juegos: [] },
  { Descuento: 80, juegos: [] },
]

// Estado dinámico de la app (variables que cambian con la interacción del usuario)
const datos = [[], [], [], []];
const filtrosActivos = [];
let itemFiltrados = [];
let itemSeleccionados = []; //apartir de button da con el nombre del juego ahi accedo propiedades
let contadorCarrito = 0;
let totalCarrito = 0;

/* ==========================================================================
   2. SELECCIÓN DE ELEMENTOS DEL DOM (Nodos HTML)
   ========================================================================== */
// Agrupá todos los document.getElementById o querySelector acá arriba
const inventario = document.getElementById('EymrNHzbVl')
const filtros = document.getElementById('filtros');
const listaGeneros = document.getElementById('f-generos');
const listaPrecio = document.getElementById('f-precio');
const listaPlataforma = document.getElementById('f-plataforma');
const listaDescuentos = document.getElementById('f-descuentos');
const carritoCompleto = document.getElementById('Carrito');
const carritoVacio = document.getElementById('lista-carrito-dropdown');
const CantidadCarrito = document.getElementById('cantidad-items-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const carritoTotal = document.getElementById('total-carrito');
const pagina3 = document.getElementById('pagina3');
const itemsCheckout = document.getElementById('VXvoGIf1A');

/* ==========================================================================
   3. LOGICA PRINCIPAL / RENDERIZADO (Funciones que dibujan en pantalla)
   ========================================================================== */
// Función encargada exclusivamente de pintar las tarjetas en el HTML
function tarjetas(arreglo) {
  if (arreglo !== itemSeleccionados && arreglo[1] !== "borrar-carrito") {
    inventario.innerHTML = "";
    for (const elemento of arreglo) {
      impresion(elemento, "inventario")
    }
  } else if (arreglo === itemSeleccionados) {
    itemsCarrito.innerHTML = "";
    for (const item of arreglo) {
      products.forEach(producto => {
        if (producto.Nombre == item) {
          impresion(producto);
        }
      });
    }
  }
}

function impresion(elemento, regla) {
  const url = {
    Steam: "../img/plataformas/steam-1.svg", Epic: "https://static.cdnlogo.com/logos/e/88/epic-games.svg",
    PSN: "https://static.cdnlogo.com/logos/p/56/playstation-and-wordmark.svg", Xbox: "https://static.cdnlogo.com/logos/x/1/xbox.svg"
  }
  const nombre = elemento.Nombre;
  const plataforma = elemento.Plataforma;
  let precio;
  let tamañoBoton = "";
  let descuento;
  if (elemento.Descuento) {
    ahorro = elemento.Precio * (1 - (elemento.Descuento / 100));
    precio = Math.round(ahorro);
    tamañoBoton = "col-5 m-1";
    descuentoBOTON = elemento.Descuento;
  } else {
    precio = elemento.Precio;
  }

  if (regla == "inventario") {
    if (elemento.Descuento) {
      inventario.innerHTML += `
    <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
        <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow ">
            <div class="d-flex justify-content-center align-items-center">
                <img class="w-50 img-fluid" src="${url[plataforma]}" alt="${plataforma}">
            </div>
            <div class="d-flex justify-content-center align-items-center my-2">
                <img class="rounded-2 w-100 img-fluid" src="../img/juegos/${nombre}.svg" alt="${nombre}">
            </div>
            <p class="fs-5 text-white fw-bold m-0 text-start">${nombre}</p>
            <div class="d-flex justify-content-center align-items-center">
            <button class="fs-6 fw-semibold text-black fw-bold text-center rounded fondo-sutil" disabled>-${descuentoBOTON}%</button>
            <button class="align-items-center rounded btn btn-outline-info text-decoration-none mt-auto btn-compra ${tamañoBoton}"
                    data-nombre="${nombre}" 
                    data-precio="${precio}"> 
                <span class="fs-5 fw-semibold m-0 text-center">$${precio}</span>
            </button>
            </div>
        </div>
    </div>
  `;
    } else {
      inventario.innerHTML += `
    <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
        <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow ">
            <div class="d-flex justify-content-center align-items-center">
                <img class="w-50 img-fluid" src="${url[plataforma]}" alt="${plataforma}">
            </div>
            <div class="d-flex justify-content-center align-items-center my-2">
                <img class="rounded-2 w-100 img-fluid" src="../img/juegos/${nombre}.svg" alt="${nombre}">
            </div>
            <p class="fs-5 text-white fw-bold m-0 text-start">${nombre}</p>
            <button class="align-items-center rounded btn btn-outline-info text-decoration-none mt-auto btn-compra ${tamañoBoton}"
                    data-nombre="${nombre}" 
                    data-precio="${precio}"> 
                <span class="fs-5 fw-semibold m-0 text-center">$${precio}</span>
            </button>
        </div>
    </div>
  `;
    }
  } else {
    if (elemento.Descuento) {
      itemsCarrito.innerHTML += `
      <li class="px-2 py-2 mb-2 border-bottom border-secondary border-opacity-25"
        style="list-style: none;">
        <div
          class="cards-steam overflow-hidden rounded-3 p-2 d-flex align-items-center justify-content-between gap-3 h-100 shadow-sm">
          <div class="d-flex align-items-center justify-content-center flex-shrink-0"
            style="width: 75px; height: 75px;">
            <img class="img-fluid" src="${url[plataforma]}" alt="${plataforma}">
          </div>
          <div class="d-flex align-items-center justify-content-center flex-shrink-0"
            style="width: 50px; height: 40px;">
            <img class="rounded-1 img-fluid" src="../img/juegos/${nombre}.svg" alt="${nombre}">
          </div>
          <div class="flex-grow-1 text-start">
            <p class="fs-6 text-white fw-bold m-0 text-truncate mx-auto"
              style="max-width: 120px; line-height: 1.2;">${nombre}</p>
          </div>
          <button class="fs-6 fw-semibold text-black fw-bold text-center rounded fondo-sutil" disabled style"width: 20px;">-${descuentoBOTON}%</button>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span class="fs-5 text-info fw-semibold"> 
            $${precio}</span>
          </div>
          <button class="d-flex align-items-center gap-2 flex-shrink-0 btn btn-outline-danger btn-eliminar"
          data-nombre="${nombre}"
          data-precio="${precio}">
            <img src="https://images.icon-icons.com/2249/PNG/512/delete_forever_outline_icon_139694.png"
              width="22px" height="22px" alt="">
          </button>
        </div>
      </li>
  `;
    } else {
      itemsCarrito.innerHTML += `
      <li class="px-2 py-2 mb-2 border-bottom border-secondary border-opacity-25"
        style="list-style: none;">
        <div
          class="cards-steam overflow-hidden rounded-3 p-2 d-flex align-items-center justify-content-between gap-3 h-100 shadow-sm">
          <div class="d-flex align-items-center justify-content-center flex-shrink-0"
            style="width: 75px; height: 75px;">
            <img class="img-fluid" src="${url[plataforma]}" alt="${plataforma}">
          </div>
          <div class="d-flex align-items-center justify-content-center flex-shrink-0"
            style="width: 50px; height: 40px;">
            <img class="rounded-1 img-fluid" src="../img/juegos/${nombre}.svg" alt="${nombre}">
          </div>
          <div class="flex-grow-1 text-start">
            <p class="fs-6 text-white fw-bold m-0 text-truncate"
              style="max-width: 120px; line-height: 1.2;">${nombre}</p>
          </div>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span class="fs-5 text-info fw-semibold"> 
            $${precio}</span>
          </div>
          <button class="d-flex align-items-center gap-2 flex-shrink-0 btn btn-outline-danger btn-eliminar"
          data-nombre="${nombre}"
          data-precio="${precio}">
            <img src="https://images.icon-icons.com/2249/PNG/512/delete_forever_outline_icon_139694.png"
              width="22px" height="22px" alt="">
          </button>
        </div>
      </li>
  `;
    }

  }
  localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito.innerHTML));
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
  descuentos.forEach((elemento) => {
    if ((elemento.juegos).length >= 1) {
      listaDescuentos.innerHTML += `
        <li><label class="dropdown-item"><input type="radio" name="descuento-unico" value="${elemento.Descuento}%"> ${elemento.Descuento}%</label></li>
    `;
    }
  })
}

function descuentosFiltro() {
  descuentos33 = descuentos[0].juegos;
  descuentos50 = descuentos[1].juegos;
  descuentos75 = descuentos[2].juegos;
  descuentos80 = descuentos[3].juegos;

  products.forEach(juego => {
    if (Array.isArray(juego.Genero)) {
      (juego.Genero).forEach(elemento => {
        if (elemento == "Accion") {
          juego.Descuento = 33;
          descuentos33.push(juego)
        } else if (elemento == "Aventura") {
          juego.Descuento = 50;
          descuentos50.push(juego)
        } else if (elemento == "Shooter") {
          juego.Descuento = 80;
          descuentos80.push(juego)
        }
      });
    } else {
      if (juego.Genero == "Accion") {
        juego.Descuento = 33;
        descuentos33.push(juego)
      } else if (juego.Genero == "Aventura") {
        juego.Descuento = 50;
        descuentos50.push(juego)
      } else if (juego.Genero == "Shooter") {
        juego.Descuento = 80;
        descuentos80.push(juego)
      }
    }
  });
  localStorage.setItem('productos', JSON.stringify(products));
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
  if (!String(propiedad).includes("%")) {
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
  } else {
    descuentos.forEach((elemento) => {
      if ((elemento.juegos).length >= 1) {
        if (elemento.Descuento == String(propiedad).slice(0, 2)) {
          tipoPropiedad = "Descuento"
        }
      }
    })
  }

  return tipoPropiedad
}

/* ==========================================================================
   5. ESCUCHADORES DE EVENTOS (Event Listeners)
   ========================================================================== */
// Captura de clics, inputs, envíos de formularios. Van al final porque llaman a las funciones de arriba.
if (inventario) {
  inventario.addEventListener('click', (event) => {
    const boton = event.target.closest('.btn-compra');
    totalCarrito += Number(boton.dataset.precio);
    if (boton) {
      contadorCarrito += 1;
      CantidadCarrito.innerText = contadorCarrito;
      const juego = boton.dataset.nombre;
      carritoTotal.innerText = `$${totalCarrito}`;
      localStorage.setItem('precioCarritoTotal', JSON.stringify(totalCarrito));
      itemSeleccionados.push(juego);
      localStorage.setItem('itemSeleccionados', JSON.stringify(itemSeleccionados));
      tarjetas(itemSeleccionados);
    }
  });
  filtros.addEventListener('click', (event) => {
    const elemento = event.target;
    if (elemento.tagName == "INPUT") {
      const actual = elemento.value;
      dato = comprobacion(actual);

      if (["Plataforma", "Precio", "Descuento", "Genero"].includes(dato)) {
        filtrosActivos.forEach((elemento, indice) => {
          if (comprobacion(elemento) === dato) {
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

      if (filtrosActivos.length == 0) {
        tarjetas(products);
        return;
      }

      itemFiltrados = products.filter(juego => {
        return filtrosActivos.every((filtro) => {
          dato = comprobacion(filtro)
          if (["Genero", "Plataforma"].includes(dato)) {
            return juego[dato].includes(filtro)
          } else if ("Precio" == dato) {
            return juego[dato] == Number(filtro)
          } else if ("Descuento" == dato) {
            return juego[dato] == String(filtro).slice(0, 2)
          }

          return juego[dato] === filtro
        })
      });

      if (filtrosActivos.length > 0 && itemFiltrados.length == 0) {
        inventario.innerHTML = `<p class="fs-1 text-white fw-bold m-0 text-center">No hay coincidencias.</p>`;
        return;
      }

      tarjetas(itemFiltrados)
    }
  });
  carritoCompleto.addEventListener('click', (event) => {
    const boton = event.target.closest('.btn-eliminar');
    if (contadorCarrito <= 0) {
      itemsCarrito.innerHTML = `<p class="fs-6 text-white fw-bold m-0 text-center">No hay productos</p>`;
    }
    if (boton) {
      const juego = boton.dataset.nombre;
      const precio = boton.dataset.precio;
      const borrar = itemSeleccionados.findIndex((elemento) => elemento == juego)
      contadorCarrito -= 1;
      if (contadorCarrito >= 2) {
        CantidadCarrito.innerText = contadorCarrito;
      } else if (contadorCarrito == 0) {
        itemsCarrito.innerHTML = `<p class="fs-6 text-white fw-bold m-0 text-center">No hay productos</p>`;
        CantidadCarrito.innerText = "";
      }

      if (borrar !== -1) {
        itemSeleccionados.splice(borrar, 1)
        totalCarrito -= Number(precio);
        carritoTotal.innerText = `$${totalCarrito}`;
        localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito.innerHTML));
        localStorage.setItem('precioCarritoTotal', JSON.stringify(totalCarrito));
        tarjetas(itemSeleccionados);
      }
    }
  });
}

/* ==========================================================================
   6. INICIALIZACIÓN DE LA APLICACIÓN (Punto de arranque)
   ========================================================================== */
// Código que se ejecuta apenas se termina de cargar la página para que la tienda no empiece vacía

if (inventario) {
  document.addEventListener('DOMContentLoaded', () => {
    descuentosFiltro();
    tarjetas(products);
    filtrado(datos);
  });
}

if (pagina3) {
  // 1. Intentamos levantar la información del LocalStorage
  const productos = localStorage.getItem('productos');
  const item = localStorage.getItem('itemSeleccionados');
  const itemCarrito = localStorage.getItem('itemsCarrito');
  const precioTotalCarrito = localStorage.getItem('precioCarritoTotal');
  // 2. Declaramos la variable de nuestro carrito
  let productosCheckout;
  let arregloItems;
  let itemCarro;

  if (productos || item || itemCarrito || precioTotalCarrito) {
    // Si había datos, los transformamos de JSON a un arreglo real de JS
    productosCheckout = JSON.parse(productos);
    arregloItems = JSON.parse(item);
    itemCarro = JSON.parse(itemCarrito);
    precioTotal = JSON.parse(precioTotalCarrito);
  } else {
    // Si la caja estaba vacía (primera visita), inicializamos el carrito vacío
    productosCheckout = [];
    arregloItems = [];
    itemCarro = [];
    precioTotal = [];
  }

  console.log(productosCheckout); // Conserva tus datos intactos de la página anterior
  console.log(arregloItems);
  console.log(itemCarro);
  console.log(precioTotal);

  if (itemsCheckout) {
    itemsCheckout.innerHTML += `${itemCarro}`;
    itemsCheckout.innerHTML += `<div id="footer-carrito" class="">
                    <li class="d-flex justify-content-between align-items-center mb-3 row">
                        <span class="fs-3 fw-bold text-black">Subtotal:</span>
                        <span id="total-carrito" class="text-info fw-bold fs-3">$${precioTotal}</span>
                    </li>
                </div>`;
  }
}