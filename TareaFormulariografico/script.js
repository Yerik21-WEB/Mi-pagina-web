// REFERENCIAS
const categoria = document.getElementById("categoria");

const formularioDinamico = document.getElementById("formularioDinamico");

const tablaDatos = document.getElementById("tablaDatos");

const generarBtn = document.getElementById("generarBtn");

const limpiarBtn = document.getElementById("limpiarBtn");

const tipoGrafico = document.getElementById("tipoGrafico");

const ctx = document.getElementById("miGrafico");

// ARRAY GENERAL
let registros = [];

// VARIABLE GRÁFICO
let grafico = null;

// CREAR FORMULARIO SEGÚN CATEGORÍA
function crearFormulario(){

    const tipo = categoria.value;

    // VENTAS
    if(tipo === "ventas"){

        formularioDinamico.innerHTML = `

            <div class="fila">

                <input 
                    type="text"
                    id="mes"
                    placeholder="Mes"
                >

                <input 
                    type="number"
                    id="monto"
                    placeholder="Monto"
                >

                <button onclick="agregarVenta()">
                    Agregar
                </button>

            </div>

        `;

    }

    // GÉNERO
    else if(tipo === "genero"){

        formularioDinamico.innerHTML = `

            <div class="fila">

                <input 
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                >

                <select id="sexo">

                    <option value="Hombre">
                        Hombre
                    </option>

                    <option value="Mujer">
                        Mujer
                    </option>

                </select>

                <button onclick="agregarGenero()">
                    Agregar
                </button>

            </div>

        `;

    }

    // CARRERAS
    else if(tipo === "carreras"){

        formularioDinamico.innerHTML = `

            <div class="fila">

                <input 
                    type="text"
                    id="estudiante"
                    placeholder="Nombre del estudiante"
                >

                <select id="carrera">

                    <option value="Ingeniería">
                        Ingeniería
                    </option>

                    <option value="Medicina">
                        Medicina
                    </option>

                    <option value="Derecho">
                        Derecho
                    </option>

                </select>

                <button onclick="agregarCarrera()">
                    Agregar
                </button>

            </div>

        `;

    }

}

// INICIAR
crearFormulario();

// CAMBIAR FORMULARIO
categoria.addEventListener("change", () => {

    registros = [];

    tablaDatos.innerHTML = "";

    crearFormulario();

});

// AGREGAR VENTAS
function agregarVenta(){

    const mes = document.getElementById("mes").value;

    const monto = document.getElementById("monto").value;

    if(mes === "" || monto === ""){

        alert("Complete todos los campos");

        return;

    }

    registros.push({

        mes,
        monto

    });

    tablaDatos.innerHTML += `

        <tr>

            <td>
                ${mes} - $${monto}
            </td>

        </tr>

    `;

}

// AGREGAR GÉNERO
function agregarGenero(){

    const nombre = document.getElementById("nombre").value;

    const sexo = document.getElementById("sexo").value;

    if(nombre === ""){

        alert("Ingrese nombre");

        return;

    }

    registros.push({

        nombre,
        sexo

    });

    tablaDatos.innerHTML += `

        <tr>

            <td>
                ${nombre} - ${sexo}
            </td>

        </tr>

    `;

}

// AGREGAR CARRERA
function agregarCarrera(){

    const estudiante = document.getElementById("estudiante").value;

    const carrera = document.getElementById("carrera").value;

    if(estudiante === ""){

        alert("Ingrese estudiante");

        return;

    }

    registros.push({

        estudiante,
        carrera

    });

    tablaDatos.innerHTML += `

        <tr>

            <td>
                ${estudiante} - ${carrera}
            </td>

        </tr>

    `;

}

// GENERAR GRÁFICO
generarBtn.addEventListener("click", () => {

    if(grafico){

        grafico.destroy();

    }

    let etiquetas = [];

    let valores = [];

    // VENTAS
    if(categoria.value === "ventas"){

        registros.forEach(registro => {

            etiquetas.push(registro.mes);

            valores.push(registro.monto);

        });

    }

    // GÉNERO
    else if(categoria.value === "genero"){

        let hombres = 0;

        let mujeres = 0;

        registros.forEach(registro => {

            if(registro.sexo === "Hombre"){

                hombres++;

            }
            else{

                mujeres++;

            }

        });

        etiquetas = ["Hombres", "Mujeres"];

        valores = [hombres, mujeres];

    }

    // CARRERAS
    else if(categoria.value === "carreras"){

        let ingenieria = 0;

        let medicina = 0;

        let derecho = 0;

        registros.forEach(registro => {

            if(registro.carrera === "Ingeniería"){

                ingenieria++;

            }

            else if(registro.carrera === "Medicina"){

                medicina++;

            }

            else{

                derecho++;

            }

        });

        etiquetas = [

            "Ingeniería",
            "Medicina",
            "Derecho"

        ];

        valores = [

            ingenieria,
            medicina,
            derecho

        ];

    }

    // CREAR GRÁFICO
    grafico = new Chart(ctx, {

        type: tipoGrafico.value,

        data: {

            labels: etiquetas,

            datasets: [{

                label: "Estadísticas",

                data: valores,

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

});

// LIMPIAR
limpiarBtn.addEventListener("click", () => {

    registros = [];

    tablaDatos.innerHTML = "";

    if(grafico){

        grafico.destroy();

    }

});