// Boton carrito

let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarAlCarrito);
});

function agregarAlCarrito(e) {
  e.preventDefault();
  const idBoton = e.currentTarget.id;
  const productoAgregado = almacen.find((producto) => producto.id === idBoton);

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumeroCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumeroCarrito() {
  let nuevoNumeroCarrito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerHTML = nuevoNumeroCarrito;
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumeroCarrito();
} else {
  productosEnCarrito = [];
}


// darkmode

const body = document.body;

