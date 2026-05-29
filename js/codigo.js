/*
 * Práctica: Renderizar listas con template literals
 * 
 * Completa las funciones para crear, insertar y eliminar nodos en el DOM.
 * Usa template literals para generar el contenido HTML.
 * 
 * Entrada: Un array de objetos con { title, description }.
 * Salida: Renderizar la lista en el contenedor con id 'article-list'.
 */

function renderList(articles) {
  // TODO: Crear un DocumentFragment
  const documento = new DocumentFragment();
  // TODO: Por cada artículo, crear un <li> con contenido usando template literals
  const articlePadre = document.getElementById("article-list")
  articles.forEach(element => {
    let html = `
    <li class="article-item">
      <h3>${element.title}</h3>
      <p>${element.description}</p>
    </li>
  `;
  const auxiliar = document.createElement('div');
  auxiliar.innerHTML = html;
  const NodoRealLi = auxiliar.firstElementChild;
  documento.appendChild(NodoRealLi)
  });
  // TODO: Vaciar el contenedor y agregar el DocumentFragment
  articlePadre.innerHTML = "";
  return articlePadre.appendChild(documento)
}

function updateList(newArticles) {
  // TODO: Eliminar todos los nodos hijos del contenedor
  const articlePadre = document.getElementById("article-list")
  articlePadre.innerHTML = "";
  // TODO: Renderizar la nueva lista
  return renderList(newArticles)
}

// Exportar funciones para pruebas
module.exports = { renderList, updateList };