// controlador de formulario de añadir alumno
// Path: js/Alumno.js

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let dni = document.getElementById("dni");
let edad = document.getElementById("edad");
let curso = document.getElementById("curso");
let checkboxes = document.querySelectorAll('input[type=checkbox]');
let materiasInscritas = [];
let boton = document.getElementById("boton");

// Revisar si local storage existe, si no existe crearlo
if (localStorage.getItem("alumnos") === null) {
    localStorage.setItem("alumnos", JSON.stringify([]));
}


class Alumno {
    constructor(nombre, apellido, dni, edad, curso, materias, promedioGeneral) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.edad = edad;
        this.curso = curso;
        this.materias = materias;
        this.promedioGeneral = promedioGeneral;
    }
    guardar() {
        let alumno = {
            nombre: this.nombre,
            apellido: this.apellido,
            dni: this.dni,
            edad: this.edad,
            curso: this.curso,
            materias: this.materias,
            promedioGeneral: 0,
        }

        // revisar que dni no exista en local storage
        let storage = JSON.parse(localStorage.getItem("alumnos"));

        // validaciones
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].dni === alumno.dni) {
                return;
            }
        }
        if (alumno.nombre === "" || alumno.apellido === "" || alumno.dni === "" || alumno.edad === "" || alumno.curso === "" || alumno.materias.length === 0) {
            alert("Por favor llene todos los campos");
            return;
        }
        storage.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(storage));
        alert("Alumno añadido correctamente");
        nombre.value = "";
        apellido.value = "";
        dni.value = "";
        edad.value = "";
        curso.value = "";
        materiasInscritas = [];
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

    }
}

let materias = {}

boton.addEventListener("click", function () {
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            if (!Array.isArray(materias[checkbox.value])) {
                materias[checkbox.value] = [];
            }
            materias[checkbox.value].push(0, 0, 0, 0); // Aquí puedes cambiar las notas según sea necesario
        }
    });

    let alumno = new Alumno(nombre.value, apellido.value, dni.value, edad.value, curso.value, materias, promedioGeneral = 0);
    alumno.guardar();
});




