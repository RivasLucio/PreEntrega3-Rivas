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

body = document.body;
const botonDarkmode = document.querySelector("#dark-mode_moon")
const botonLightmode = document.querySelector("#dark-mode_sun")
let darkmode = localStorage.getItem("dark-mode")

function activarDarkmode() {
  body.classList.add("darkmode")
  localStorage.setItem("dark-mode", "activado")
  botonDarkmode.classList.add("disabled")
  botonLightmode.classList.remove("disabled")
}

function activarLightmode() {
  body.classList.remove("darkmode")
  localStorage.setItem("dark-mode", "desactivado")  
  botonDarkmode.classList.remove("disabled")
  botonLightmode.classList.add("disabled")      
}

if (darkmode === "activado") {
  activarDarkmode();
} else {
  activarLightmode();
}

botonDarkmode.addEventListener("click", (e) => {
  darkmode = localStorage.getItem("dark-mode");
  e.preventDefault()
  activarDarkmode()  
})

botonLightmode.addEventListener("click", (e) => {
  darkmode = localStorage.getItem("dark-mode");
  e.preventDefault()
  activarLightmode()  
})



