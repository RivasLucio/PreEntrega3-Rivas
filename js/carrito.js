const body = document.body;
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const precioTotal = document.querySelector("#total");
const carritoAccionesComprar = document.querySelector("#carrito-acciones-comprar");

const contenedorCarritoProductos = document.querySelector("#carrito-productos");

let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let botonVaciar = document.querySelector("#carrito-acciones-vaciar");

function cargaDeProductos() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    carritoVacio.classList.add("disabled");
    carritoVacio.classList.remove("margin-vacio");
    carritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${
        producto.titulo
      }">
<div class="carrito-producto-titulo">
    <small>Título</small>
    <h3>${producto.titulo}</h3>
</div>
<div class="carrito-producto-cantidad">
    <small>Cantidad</small>
    <p>${producto.cantidad}</p>
</div>
<div class="carrito-producto-precio">
    <small>Precio</small>
    <p>$${producto.precio}</p>
</div>
<div class="carrito-producto-subtotal">
    <small>Subtotal</small>
    <p>$${producto.precio * producto.cantidad}</p>
</div>
<button class="carrito-producto-eliminar" id="${producto.id}">
<i class="bi bi-trash-fill"></i></button>`;

      contenedorCarritoProductos.append(div);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
  }

  botonesEliminar();
  actualizarTotal()
}

cargaDeProductos();

function botonesEliminar() {
  botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  let idBoton = e.currentTarget.id;
  let productoEliminado = productosEnCarrito.find(
    (producto) => producto.id === idBoton
  );

  let index = productosEnCarrito.indexOf(productoEliminado);
  productosEnCarrito.splice(index, 1);
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  cargaDeProductos();
  actualizarNumeroCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  cargaDeProductos();
}

function actualizarTotal() {
  const totalCalculo = productosEnCarrito.reduce(
    (acc, producto) => acc + (producto.precio * producto.cantidad),0);
    precioTotal.innerText = `$${totalCalculo}`
}



carritoAccionesComprar.addEventListener("click", compraDeCarrito);
function compraDeCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  carritoVacio.classList.add("disabled");
  carritoAcciones.classList.add("disabled");
  carritoComprado.classList.remove("disabled");
  carritoComprado.classList.add("producto-comprado");
  contenedorCarritoProductos.classList.add("disabled");
  actualizarNumeroCarrito()
}