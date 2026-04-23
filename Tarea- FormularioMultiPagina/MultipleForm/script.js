let pasoActual = 0;

let registroMedico = inicializarRegistro();

let todosLosRegistros = JSON.parse(localStorage.getItem("pacientesDB")) || [];

mostrarPaso(pasoActual);
dibujarTablaGlobal();

function inicializarRegistro() {
  return {
    datosPersonales: {},
    familiares: [],
    condicionesPreExistentes: [],
    internamientos: []
  };
}

function mostrarPaso(n) {
  let pasos = document.getElementsByClassName("step");
  
  for (let i = 0; i < pasos.length; i++) {
    pasos[i].classList.remove("active");
  }
  pasos[n].classList.add("active");

  document.getElementById("prevBtn").style.display = (n === 0) ? "none" : "inline-block";

  if (n === (pasos.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Grabar / Finalizar";
    generarTablas();
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
}

function cambiarPaso(n) {
  let pasos = document.getElementsByClassName("step");
  
  if (pasoActual === 0 && n === 1) {
    registroMedico.datosPersonales = {
      nombre: document.getElementById("nombre").value,
      cedula: document.getElementById("cedula").value
    };
  }

  if (pasoActual === pasos.length - 1 && n === 1) {
    guardarEnLocalStorage();
    return;
  }

  pasoActual = pasoActual + n;
  mostrarPaso(pasoActual);
}

function agregarFamiliar() {
  let nombre = document.getElementById("famNombre").value;
  let parentesco = document.getElementById("famParentesco").value;
  let edad = document.getElementById("famEdad").value;

  if (nombre && parentesco && edad) {
    registroMedico.familiares.push({ nombre, parentesco, edad });
    let li = document.createElement("li");
    li.innerText = `${nombre} / ${parentesco} / ${edad} años`;
    document.getElementById("listaFamiliares").appendChild(li);
    document.getElementById("famNombre").value = "";
    document.getElementById("famParentesco").value = "";
    document.getElementById("famEdad").value = "";
  }
}

function agregarCondicion() {
  let enfermedad = document.getElementById("condEnfermedad").value;
  let tiempo = document.getElementById("condTiempo").value;

  if (enfermedad && tiempo) {
    registroMedico.condicionesPreExistentes.push({ enfermedad, tiempo });
    let li = document.createElement("li");
    li.innerText = `${enfermedad} --> Tiempo: ${tiempo}`;
    document.getElementById("listaCondiciones").appendChild(li);
    document.getElementById("condEnfermedad").value = "";
    document.getElementById("condTiempo").value = "";
  }
}

function agregarInternamiento() {
  let fecha = document.getElementById("intFecha").value;
  let centro = document.getElementById("intCentro").value;
  let diagnostico = document.getElementById("intDiagnostico").value;

  if (fecha && centro && diagnostico) {
    registroMedico.internamientos.push({ fecha, centro, diagnostico });
    let li = document.createElement("li");
    li.innerText = `${fecha} - ${centro} (Diagnóstico: ${diagnostico})`;
    document.getElementById("listaInternamientos").appendChild(li);
    document.getElementById("intFecha").value = "";
    document.getElementById("intCentro").value = "";
    document.getElementById("intDiagnostico").value = "";
  }
}

function generarTablas() {
  let contenedor = document.getElementById("tablasContenedor");
  let html = `<h4 class="tabla-titulo">Datos Personales</h4>
              <table><tr><th>Nombre</th><td>${registroMedico.datosPersonales.nombre || "N/A"}</td></tr>
              <tr><th>Cédula</th><td>${registroMedico.datosPersonales.cedula || "N/A"}</td></tr></table>`;

  html += `<h4 class="tabla-titulo">Totales Registrados</h4>`;
  html += `<ul>
            <li>Familiares: ${registroMedico.familiares.length}</li>
            <li>Condiciones: ${registroMedico.condicionesPreExistentes.length}</li>
            <li>Internamientos: ${registroMedico.internamientos.length}</li>
           </ul>`;
  
  contenedor.innerHTML = html;
}

function guardarEnLocalStorage() {
  if (!registroMedico.datosPersonales.nombre) {
    alert("Error: Debes ingresar al menos un nombre en la Página 1.");
    return;
  }

  todosLosRegistros.push(registroMedico);

  localStorage.setItem("pacientesDB", JSON.stringify(todosLosRegistros));

  dibujarTablaGlobal();

  alert("¡Registro guardado exitosamente!");
  resetearFormulario();
}

function dibujarTablaGlobal() {
  let contenedor = document.getElementById("tablaGlobalContenedor");
  
  if (todosLosRegistros.length === 0) {
    contenedor.innerHTML = "<p>No hay registros guardados aún.</p>";
    return;
  }

  let html = `<table class="tabla-global">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Paciente</th>
                    <th>Cédula</th>
                    <th>Familiares</th>
                    <th>Condiciones</th>
                    <th>Internamientos</th>
                  </tr>
                </thead>
                <tbody>`;

  todosLosRegistros.forEach((paciente, index) => {
    html += `<tr>
                <td>${index + 1}</td>
                <td>${paciente.datosPersonales.nombre}</td>
                <td>${paciente.datosPersonales.cedula}</td>
                <td>${paciente.familiares.length}</td>
                <td>${paciente.condicionesPreExistentes.length}</td>
                <td>${paciente.internamientos.length}</td>
             </tr>`;
  });

  html += `</tbody></table>`;
  contenedor.innerHTML = html;
}

function resetearFormulario() {
  document.getElementById("medicalForm").reset();
  
  document.getElementById("listaFamiliares").innerHTML = "";
  document.getElementById("listaCondiciones").innerHTML = "";
  document.getElementById("listaInternamientos").innerHTML = "";
  
  registroMedico = inicializarRegistro();
  
  pasoActual = 0;
  mostrarPaso(pasoActual);
}

function limpiarLocalStorage() {
  if(confirm("¿Estás seguro de que deseas borrar TODOS los registros guardados? Esto no se puede deshacer.")) {
    localStorage.removeItem("pacientesDB");
    todosLosRegistros = [];
    dibujarTablaGlobal();
  }
}