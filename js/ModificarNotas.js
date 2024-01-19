let urlParams = new URLSearchParams(window.location.search);
let dni = urlParams.get("dni");

loader = document.getElementById("loader");

    let alumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (alumnos.filter((alumno) => alumno.dni == dni).length === 0) {
      loader.innerHTML = "No existe el alumno";
      console.error("No existe el alumno");
    }
    // si existe, mostrar los datos del alumno
    alumno = alumnos.filter((alumno) => alumno.dni == dni)[0];
    loader.remove();
    document.getElementById("titulo").innerHTML = `${alumno.nombre} ${alumno.apellido}`;
    document.getElementById("subtitulo").innerHTML = `DNI: ${alumno.dni}`;

    let materias = Object.keys(alumno.materias);
    let notas = Object.values(alumno.materias);
    let tabla = document.getElementById("tablaNotas");
    let encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th class="text-center">Materia</th>
        <th class="text-center">Nota 1</th>
        <th class="text-center">Nota 2</th>
        <th class="text-center">Nota 3</th>
        <th class="text-center">Nota 4</th>
        <th class="text-center">Promedio</th>
        `;
    tabla.appendChild(encabezado);
    for (let i = 0; i < materias.length; i++) {
      let fila = document.createElement("tr");
      fila.innerHTML = `
    <td class="text-center" id="materia-${materias[i]}">${materias[i]}</td>
    <td class="text-center"><input type="number" id="nota1-${materias[i]}" value="${notas[i][0]}"></td>
    <td class="text-center"><input type="number" id="nota2-${materias[i]}" value="${notas[i][1]}"></td>
    <td class="text-center"><input type="number" id="nota3-${materias[i]}" value="${notas[i][2]}"></td>
    <td class="text-center"><input type="number" id="nota4-${materias[i]}" value="${notas[i][3]}"></td>
    <td class="text-center" id="promedio-${materias[i]}"">${((notas[i][0] + notas[i][1] + notas[i][2] + notas[i][3]) / 4).toFixed(1)}</td>
    `;
      tabla.appendChild(fila);
    }
    tabla.innerHTML += `
    <td>
        <td class="text-center">Promedio General</td>
        <td class="text-center" id="promedioGeneral">${alumno.promedioGeneral == NaN || undefined ? 'Sin promedio' : parseFloat(alumno.promedioGeneral).toFixed(2)}</td>
    </td>
    `

    let botonGuardar ="<button class='text-white bg-gray-800 hover:bg-gray-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2' id='botonGuardar'>Guardar</button>";
    document.getElementById("contenido").innerHTML += botonGuardar;
    document.getElementById("botonGuardar").addEventListener("click", function () {
        let sumaPromedios = 0;
        for (let i = 0; i < materias.length; i++) {
            alumno.materias[materias[i]] = [
                parseFloat(document.getElementById(`nota1-${materias[i]}`).value),
                parseFloat(document.getElementById(`nota2-${materias[i]}`).value),
                parseFloat(document.getElementById(`nota3-${materias[i]}`).value),
                parseFloat(document.getElementById(`nota4-${materias[i]}`).value),
            ];
            let promedioMateria = (alumno.materias[materias[i]][0] +
                alumno.materias[materias[i]][1] +
                alumno.materias[materias[i]][2] +
                alumno.materias[materias[i]][3]) / 4;
            alumno.materias[materias[i]].push(promedioMateria);
            sumaPromedios += promedioMateria;
        }
        alumno.promedioGeneral = sumaPromedios / materias.length; // Aquí se modifica el valor de promedioGeneral
        console.log(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        window.location.reload();
    });

