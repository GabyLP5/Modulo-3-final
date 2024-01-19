// variables mutables
let = criterio = "";
let radioButton = document.getElementsByName("filtro");
let orden = document.getElementsByName("orden");
let inputBusqueda = document.getElementById("inputBusqueda");
let alumnos = JSON.parse(localStorage.getItem("alumnos"));

if (alumnos === null) {
    localStorage.setItem("alumnos", JSON.stringify([]));
    alumnos = [];
}
if (alumnos.length === 0) {
    document.getElementById("mensaje").innerHTML = "No hay alumnos cargados";
}


// constantes
const tdAprobado = "<td class='text-center text-green-500'>Aprobado</td>";
const tdReprobado = "<td class='text-center text-red-500'>Reprobado</td>";
const tdSinNotas = "<td class='text-center'>Faltan notas</td>";
const urlParams = new URLSearchParams(window.location.search);
switch (true) {
    case urlParams.has("nombre"):
        criterio = "nombre";
        break;
    case urlParams.has("apellido"):
        criterio = "apellido";
        break;
    case urlParams.has("dni"):
        criterio = "dni";
        break;
    case urlParams.has("edad"):
        criterio = "edad";
        break;
    case urlParams.has("curso"):
        criterio = "curso";
        break;
    case urlParams.has("promedioGeneral"):
        criterio = "promedioGeneral";
        break;
    default:
        criterio = "";
        break;
}
const aBuscar = urlParams.get(criterio);

// funciones
function busquedaTablaHash(busqueda, alumnos, parametro, orden) {
    console.log(busqueda, alumnos, parametro, orden);
    let stringMinuscula = busqueda.toLowerCase();
    let tablaHash = new Map();
    for (let alumno of alumnos) {
        let string = alumno[parametro].toLowerCase();
        if (string.includes(stringMinuscula)) {
            if (tablaHash.has(string)) {
                tablaHash.get(string).push(alumno);
            } else {
                tablaHash.set(string, [alumno]);
            }
        }
    }
    let resultados = [];
    for (let value of tablaHash.values()) {
        resultados = resultados.concat(value);
    }

    // Ordenar resultados
    resultados.sort((a, b) => {
        if (orden === 'asc') {
            return a[parametro] > b[parametro] ? 1 : -1;
        } else if (orden === 'desc') {
            return a[parametro] < b[parametro] ? 1 : -1;
        } else {
            return 0;
        }
    });

    return resultados;
}

function eliminar(dni) {
    let lista = JSON.parse(localStorage.getItem("alumnos"));
    let nuevaLista = lista.filter((alumno) => alumno.dni != dni);
    localStorage.setItem("alumnos", JSON.stringify(nuevaLista));
    location.reload();
}

function modificar(dni) {
    window.location.href = `ModificarNotas.html?dni=${dni}`;
}

function cambiarPlaceholder(criterio){
    inputBusqueda.placeholder = criterio
}

function preBusqueda(busqueda,criterio){
}



// ejecución
let ordenElegido
// checkear orden
if (urlParams.has("orden")) {
    switch (urlParams.get("orden")) {
        case "asc":
            ordenElegido = "asc";
            break;
        case "desc":
            ordenElegido = "desc";
            break;
        default:
            break;
    }
}

let lista = busquedaTablaHash(aBuscar, alumnos, criterio, ordenElegido);

window.onload = function () {
    document.getElementById("spinner").remove();
    if (lista.length === 0) {
        document.getElementById("mensaje").innerHTML = "No se han encontrado alumnos";
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



// detectar cuando se presione el boton btnBusquedaFiltros
document.getElementById("btnBusquedaFiltros").addEventListener("click", () => {{
    let busqueda = inputBusqueda.value;
    let orden = document.querySelector('input[name="orden"]:checked').value;
    window.location.href = `BuscarAlumno.html?${criterio}=${busqueda}&orden=${orden}`;
    }
})



