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