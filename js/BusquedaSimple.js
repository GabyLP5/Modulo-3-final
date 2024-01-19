// obtener boton para buscar
const botonBuscar = document.getElementById("btnBuscar");

// obtener input para buscar
let inputBuscar = document.getElementById("inputBuscar");

// imprimir en consola el input cuando se presione el boton
botonBuscar.addEventListener("click", () => {
    // redireccionar a BuscarAlumni.html con query de nombre
    window.location.href = `./BuscarAlumno.html?nombre=${inputBuscar.value}`;
});