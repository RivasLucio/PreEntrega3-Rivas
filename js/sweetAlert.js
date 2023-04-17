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
  