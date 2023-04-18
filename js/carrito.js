let body = document.body;
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




const actualizarTotal = () => {
  const totalCalculo = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  precioTotal.innerText = `$${totalCalculo}`;
};

const cargaDeProductos = () => {
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
    <small>Producto</small>
    <h3>${producto.titulo}</h3>
</div>
<div class="carrito-producto-cantidad">
    <small>Cantidad</small>
    <p>${producto.cantidad}</p>
</div>
<div class="carrito-producto-precio">
    <small>Precio por unidad</small>
    <p>$${producto.precio}</p>
</div>
<div class="carrito-producto-subtotal">
    <small>Subtotal</small>
    <p>$${producto.precio * producto.cantidad}</p>
</div>
<button class="carrito-producto-eliminar" id="${producto.id}">
🗑</button>`;

      contenedorCarritoProductos.append(div);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
  }

  botonesEliminar();
  actualizarTotal();
};



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



// accion de vaciar carrito con sweetAlert2
function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  cargaDeProductos();
  actualizarNumeroCarrito();
}



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
  actualizarNumeroCarrito();
}



botonVaciar.addEventListener("click", () => {
  Swal.fire({
    iconHtml: '<i class="bi bi-trash"></i>',
    title: '¿Deseas vaciar todo el carrito?',
    icon: `question`,
    iconColor:`#ea7914`,
    showCancelButton: true,
    confirmButtonText: `Si`,
    confirmButtonColor: '#ea7914',
    cancelButtonText: `No`,
    cancelButtonColor: '#d33',
    overflow:`hidden`,
    showClass: {
      popup: 'animate__animated animate__bounceInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOutDown'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'bottom-start',
        icon: 'success',
        title: 'Carrito borrado',
        showConfirmButton: false,
        timer: 2000,
        showClass: {
      popup: 'animate__animated animate__bounceInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOutDown'
    }
      })
      
      vaciarCarrito()
    }
  })
  
})



carritoAccionesComprar.addEventListener("click", () => {
  Swal.fire({
    iconHtml: '<i class="bi bi-cart4"></i>',
    title: '¿Deseas finalizar la compra?',
    icon: `question`,
    iconColor:`#ea7914`,
    showCancelButton: true,
    confirmButtonText: `Si`,
    confirmButtonColor: '#ea7914',
    cancelButtonText: `No`,
    cancelButtonColor: '#d33',
    showClass: {
      popup: 'animate__animated animate__bounceInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOutDown'
    }
    
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Gracias por tu compra',
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__bounceInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOutDown'
        }
      })
      compraDeCarrito()
    }
  })
})
