const tdAprobado = "<td class='text-center text-green-500'>Aprobado</td>";
const tdReprobado = "<td class='text-center text-red-500'>Reprobado</td>";
const tdSinNotas = "<td class='text-center'>Faltan notas</td>";

// obtener la lista de alumnos
function obtenerListaDeAlumnos() {
    let alumnos = [];
    // Si no existe, crearla
    if (localStorage.getItem("alumnos") == null) {
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
    } else {
        alumnos = JSON.parse(localStorage.getItem("alumnos"));
    }
    return alumnos;
}

function eliminar(dni) {
    let lista = obtenerListaDeAlumnos();
    let nuevaLista = lista.filter((alumno) => alumno.dni != dni);
    localStorage.setItem("alumnos", JSON.stringify(nuevaLista));
    location.reload();
}

function modificar(dni) {
    window.location.href = `ModificarNotas.html?dni=${dni}`;
}

lista = obtenerListaDeAlumnos();
// Una vez que se cargue la página, eliminar el spinner y mostrar la tabla
window.onload = function () {
    document.getElementById("spinner").remove();
    if (lista.length === 0) {
        document.getElementById("mensaje").innerHTML = "No hay alumnos cargados";
    }
    else {
        console.log(lista);
        for (let i = 0; i < lista.length; i++) {
            document.getElementById("contenidoTabla").innerHTML += `
            <tr>
                <td class="text-center">${lista[i].dni}</td>
                <td class="text-center">${lista[i].nombre}</td>
                <td class="text-center">${lista[i].apellido}</td>
                <td class="text-center">${lista[i].edad}</td>
                <td class="text-center">${lista[i].curso}</td>
                <td class="text-center">${parseFloat(lista[i].promedioGeneral).toFixed(2)}</td>
                ${lista[i].promedioGeneral == 0 ? tdSinNotas : lista[i].promedioGeneral >= 4 ? tdAprobado : tdReprobado}
                <td class="text-center"><button class="text-white bg-gray-800 hover:bg-gray-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onclick="modificar(${lista[i].dni})">Modificar</button></td>
                <td class="text-center"><button class="text-white bg-gray-800 hover:bg-gray-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onclick="eliminar(${lista[i].dni})">Eliminar</button></td>
            </tr>
            `

        }
    }
}


