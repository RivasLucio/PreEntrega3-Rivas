// Boton carrito

let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");

almacen = [];
fetch("../js/almacen.json")
.then(response => response.json())
.then(data => {
  almacen = data;
  cargaDeProductos(almacen);
})

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
  notif()
}

const actualizarNumeroCarrito = () => {
  let nuevoNumeroCarrito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerHTML = nuevoNumeroCarrito;
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
 productosEnCarritoLS ? (productosEnCarrito = JSON.parse(productosEnCarritoLS),actualizarNumeroCarrito()) : productosEnCarrito = []

// darkmode

body = document.body;
const botonDarkmode = document.querySelector("#dark-mode_moon")
const botonLightmode = document.querySelector("#dark-mode_sun")
let darkmode = localStorage.getItem("dark-mode")

const activarDarkmode=()=> {
  body.classList.add("darkmode")
  localStorage.setItem("dark-mode", "activado")
  botonDarkmode.classList.add("disabled")
  botonLightmode.classList.remove("disabled")
}

const activarLightmode =() => {
  body.classList.remove("darkmode")
  localStorage.setItem("dark-mode", "desactivado")  
  botonDarkmode.classList.remove("disabled")
  botonLightmode.classList.add("disabled")      
}

 darkmode === "activado" ? activarDarkmode() : activarLightmode() 


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

// efecto carrito header
const carritoHeader = document.querySelector("#carrito-header");
const botonCarritoHeader = document.querySelectorAll(".card-boton")


botonCarritoHeader.forEach(boton => {
  boton.addEventListener("click", () => {
    carritoHeader.classList.add("carrito-header");
    setTimeout(() => {
      carritoHeader.classList.remove("carrito-header");
      carritoHeader.classList.add("carrito-header--hide");
    },2000);
  })
})




//toastify
const notif = () => {
  Toastify({
    text: "Se agrego al carrito",
    duration: 1200,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#f19f50",
      borderRadius: "20px",
    },
    onClick: function(){} // Callback after click
  }).showToast();
}