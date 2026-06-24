/* ==========================================================================
   1. VARIABLES GLOBAL / ESTADO DE LA APLICACIÓN
   ========================================================================== */
// Datos estáticos o configuraciones
const descuentos = [
  { Descuento: 33, juegos: [] },
  { Descuento: 50, juegos: [] },
  { Descuento: 75, juegos: [] },
  { Descuento: 80, juegos: [] },
]
const url = {
  Steam: "../img/plataformas/steam-1.svg", Epic: "https://cdn2.steamgriddb.com/logo_thumb/ef469da55386b89993b2b644f5ba5140.png",
  PSN: "https://static.freepnglogo.com/images/all_img/1716830593playstation-Logo-png-white.png", Xbox: "https://static.cdnlogo.com/logos/x/1/xbox.svg"
}

// Estado dinámico de la app (variables que cambian con la interacción del usuario)
let portadasUrl;
let products;
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

async function impresion(elemento, regla) {
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
  const portadaUrl = portadasUrl.find((elementoP) => {
    if (elementoP.nombre == nombre) {
      return elementoP.url
    }
  })


  const tieneDescuento = !!elemento.Descuento;
  const descuentoHTMLInventario = tieneDescuento
    ? `<button class="fs-6 fw-semibold text-black fw-bold text-center rounded fondo-sutil" disabled>-${descuentoBOTON}%</button>`
    : '';
  const descuentoHTMLCarrito = tieneDescuento
    ? `<button class="fs-6 fw-semibold text-black fw-bold text-center rounded fondo-sutil" disabled style="width: auto;">-${descuentoBOTON}%</button>`
    : '';

  if (regla == "inventario") {
    inventario.innerHTML += `
    <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
        <div class="cards-${plataforma.toLowerCase()} overflow-hidden rounded-4 p-3 d-flex flex-column gap-2 h-100 shadow">
            <div class="d-flex justify-content-center align-items-center">
                <img class="w-50 img-fluid" src="${url[plataforma]}" alt="${plataforma}">
            </div>
            <div class="d-flex justify-content-center align-items-center my-2 m-2">
                <img class="rounded-2 img-fluid m-2" src="${portadaUrl.url}" alt="${nombre}">
            </div>
            <p class="fs-5 text-white fw-bold m-0 text-start">${nombre}</p>
            <div class="d-flex justify-content-center align-items-center">
                ${descuentoHTMLInventario}
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
    itemsCarrito.innerHTML += `
    <li class="px-2 py-2 mb-2 border-bottom border-secondary border-opacity-25" style="list-style: none;">
      <div class="cards-steam overflow-hidden rounded-3 p-2 d-flex align-items-center justify-content-between gap-3 h-100 shadow-sm">
        <div class="d-flex align-items-center justify-content-center flex-shrink-0" style="width: 75px; height: 75px;">
          <img class="img-fluid" src="${url[plataforma]}" alt="${plataforma}">
        </div>
        <div class="d-flex align-items-center justify-content-center flex-shrink-0 m-2" style="width: 50px; height: 40px;">
          <img class="rounded-1 img-fluid m-2" src="${portadaUrl.url}" alt="${nombre}">
        </div>
        <div class="flex-grow-1 text-start">
          <p class="fs-6 text-white fw-bold m-0 ${tieneDescuento ? 'mx-auto' : 'text-truncate'}" 
             style="max-width: ${tieneDescuento ? '110px' : '120px'}; line-height: 1.2;">${nombre}</p>
        </div>
        ${descuentoHTMLCarrito}
        <div class="d-flex align-items-center gap-2 flex-shrink-0">
          <span class="fs-5 text-info fw-semibold">$${precio}</span>
        </div>
        <button class="d-flex align-items-center gap-2 flex-shrink-0 btn btn-outline-danger btn-eliminar" data-nombre="${nombre}" data-precio="${precio}"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>
      </div>
    </li>
  `;
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
        if (elemento == "Shooter") {
          juego.Descuento = 33;
          descuentos33.push(juego)
        } else if (elemento == "Accion") {
          juego.Descuento = 50;
          descuentos50.push(juego)
        } else if (elemento == "Shooter") {
          juego.Descuento = 80;
          descuentos80.push(juego)
        }
      });
    } else {
      if (juego.Genero == "Shooter") {
        juego.Descuento = 33;
        descuentos33.push(juego)
      } else if (juego.Genero == "Accion") {
        juego.Descuento = 50;
        descuentos50.push(juego)
      } else if (juego.Genero == "Shooter") {
        juego.Descuento = 80;
        descuentos80.push(juego)
      }
    }
  });
  tarjetas(products)
  localStorage.setItem('productos', JSON.stringify(products));
}

async function jsonProductos() {
  // 2. Usamos 'await' para pausar la ejecución hasta que el archivo descargue
  const respuesta = await fetch('../database/productos.json');
  // 3. Volvemos a usar 'await' para esperar la conversión a objeto de JS
  const videojuegos = await respuesta.json();
  return videojuegos;
}

async function fotoProductos() {
  let portadas = [];
  // 2. Usamos 'await' para pausar la ejecución hasta que el archivo descargue
  const respuesta = await fetch('../database/games_appid.json');
  // 3. Volvemos a usar 'await' para esperar la conversión a objeto de JS
  const videojuegos = await respuesta.json();
  // ⚙️ Convertimos el arreglo en un Map usando el appid como clave
  products.forEach(productos => {
    videojuegos.forEach(elemento => {
      if (elemento.name == productos.Nombre) {
        const url = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${elemento.appid}/library_600x900.jpg`
        portadas.push({ nombre: elemento.name, url: url })
      }
    })
  })
  return portadas;
}

/* ==========================================================================
   4. FUNCIONES AUXILIARES / FILTRADO / MANEJO DE ESTADO
   ========================================================================== */
// Lógica pura de negocios (filtrar datos, cálculos matemáticos, etc.)

function ordenamiento(arreglo, propiedad) {
  for (let i = 0; i < 4; i++) {
    arreglo = datos[i];
    if (i == 0) {
      propiedad = "Nombre";
    } else if (i == 1) {
      propiedad = "Genero";
    } else if (i == 2) {
      propiedad = "Precio";
    } else if (i == 3) {
      propiedad = "Plataforma";
    }
    products.map((elemento) => {
      let actual = elemento[propiedad];
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
  document.addEventListener('DOMContentLoaded', async () => {
    products = await jsonProductos();
    portadasUrl = await fotoProductos();
    localStorage.setItem('portadasUrl', JSON.stringify(portadasUrl));
    ordenamiento();
    descuentosFiltro();
    tarjetas(products);
    filtrado(datos);
  });
}

if (pagina3) {
  const textoCheckout = document.getElementById('VXvoGIf1A');
  const itemsCheckout = document.getElementById('VXvoGIf1B');
  const formulario = document.getElementById('formulario-checkout');
  // 1. Intentamos levantar la información del LocalStorage
  const productos = localStorage.getItem('productos');
  const item = localStorage.getItem('itemSeleccionados');
  const itemCarrito = localStorage.getItem('itemsCarrito');
  const precioTotalCarrito = localStorage.getItem('precioCarritoTotal');
  const portadas = localStorage.getItem('portadasUrl');
  // 2. Inicializamos las variables con un fallback por si están vacías (Evitamos cortocircuitos)
  let productosCheckout = productos ? JSON.parse(productos) : [];
  let arregloItems = item ? JSON.parse(item) : [];
  let precioTotal = precioTotalCarrito ? JSON.parse(precioTotalCarrito) : 0;
  let itemCarro = itemCarrito ? JSON.parse(itemCarrito) : 0;
  let portadasUrl = portadas ? JSON.parse(portadas) : 0;
  let traba = 0;
  function tarjetasPagina3(arreglo) {
    itemsCheckout.innerHTML = "";
    for (const item of arreglo) {
      productosCheckout.forEach(producto => {
        if (producto.Nombre == item) {
          impresionPagina3(producto);
        }
      });
    }
  }
  function impresionPagina3(elemento) {
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
    const portadaUrl = portadasUrl.find((elementoP) => {
      if (elementoP.nombre == nombre) {
        return elementoP.url
      }
    })
    if (elemento.Descuento) {
      itemsCheckout.innerHTML += `
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
            <img class="rounded-1 img-fluid" src="${portadaUrl.url}" alt="${nombre}">
          </div>
          <div class="flex-grow-1 text-start">
            <p class="fs-6 text-white fw-bold m-0 mx-auto"
              style="max-width: 110px; line-height: 1.2;">${nombre}</p>
          </div>
          <button class="fs-6 fw-semibold text-black fw-bold text-center rounded fondo-sutil" disabled style"width: auto;">-${descuentoBOTON}%</button>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span class="fs-5 text-info fw-semibold"> 
            $${precio}</span>
          </div>
          <button class="d-flex align-items-center gap-2 flex-shrink-0 btn btn-outline-danger btn-eliminar"
          data-nombre="${nombre}"
          data-precio="${precio}"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
            
          </button>
        </div>
      </li>
  `;
    } else if (!elemento.Descuento) {
      itemsCheckout.innerHTML += `
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
            <img class="rounded-1 img-fluid" src="${portadaUrl.url}" alt="${nombre}">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
          </button>
        </div>
      </li>
  `;
    }
  }
  if (itemsCheckout && traba == 0) {
    traba = 1;
    tarjetasPagina3(arregloItems);
    const divFooter = document.createElement('div');
    divFooter.id = "footer-carrito";
    divFooter.className = "m-3";
    divFooter.innerHTML = `
      <li class="d-flex justify-content-between align-items-center mb-3 row" style="list-style: none;">
          <span class="fs-3 fw-bold text-black">Subtotal:</span>
          <span id="total-carrito-3" class="text-primary fw-bold fs-3">$${precioTotal}</span>
      </li>
    `;
    textoCheckout.appendChild(divFooter);
  }
  textoCheckout.addEventListener('click', (event) => {
    const boton = event.target.closest('.btn-eliminar');
    const carritoTotal = document.getElementById('total-carrito-3');
    if (boton) {
      const juego = boton.dataset.nombre;
      const precio = boton.dataset.precio;
      const borrar = arregloItems.findIndex((elemento) => elemento == juego)
      if (borrar !== -1) {
        arregloItems.splice(borrar, 1)
        precioTotal -= Number(precio);
        carritoTotal.innerText = `$${precioTotal}`;
        tarjetasPagina3(arregloItems);
      }
    }
  });
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('input-nombre');
    const apellido = document.getElementById('input-apellido');
    const dni = document.getElementById('input-dni');
    const pedido = {
      comprador: {
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value
      },
      items: arregloItems, // Los juegos que tenías en LocalStorage
      total: precioTotal,  // El subtotal calculado
      fecha: new Date().toLocaleString()
    }
    Swal.fire({
      title: '¡Compra Finalizada!',
      html: `
    <div class="text-start">
        <p><strong>Cliente:</strong> ${pedido.comprador.nombre} ${pedido.comprador.apellido}</p>
        <p><strong>DNI:</strong> ${pedido.comprador.dni}</p>
        <hr>
        <h6>Artículos:</h6>
        <ul class="list-unstyled">
        ${arregloItems.map(juego => {
        // 1. Buscamos el objeto del juego completo en la base de datos usando .find()
        const juegoEncontrado = productosCheckout.find(element => element.Nombre === juego);

        // 2. Calculamos el precio en una variable limpia fuera del string
        let precioFinal = 0;
        if (juegoEncontrado) {
          if (juegoEncontrado.Descuento) {
            let ahorro = juegoEncontrado.Precio * (1 - (juegoEncontrado.Descuento / 100));
            precioFinal = Math.round(ahorro);
          } else {
            precioFinal = juegoEncontrado.Precio;
          }
        }

        // 3. Ahora que tenemos el precio real, retornamos el string HTML limpio
        return `<li>🎮 ${juego} - $${precioFinal}</li>`;
      }).join('')}
        </ul>
        <hr>
        <h5>Total: <span class="text-info">$${precioTotal}</span></h5>
    </div>
  `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0dcaf0' // El color celeste (btn-info) que combina con tu interfaz
    }).then((result) => {
      if (result.isConfirmed) {
        // Cuando el usuario hace clic en "Aceptar", se limpia el storage y se redirige
        localStorage.clear();
        window.location.href = '../index.html';
      }
    });
  })
}