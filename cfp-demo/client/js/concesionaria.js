//BOTON AGREGAR
let btnAgregar = document.querySelector('#agregar');
btnAgregar.addEventListener('click', agregar);

//BOTON MOSTRAR SOLO AUTOS
let btnAutos = document.querySelector('#autos');
btnAutos.addEventListener('click', () => {
    limpiarCampos();
    btnAgregar.innerHTML="Agregar";
    btnAgregar.removeAttribute('idx');
    mostrarPorTipo('auto');
});

//BOTON MOSTRAR SOLO CAMIONETAS
let btnCamionetas = document.querySelector('#camionetas');
btnCamionetas.addEventListener('click', () => {
    limpiarCampos();
    btnAgregar.innerHTML="Agregar";
    btnAgregar.removeAttribute('idx');
    mostrarPorTipo('camioneta');
});

//BOTON MOSTRAR TODOS
let btnTodos = document.querySelector('#todos');
btnTodos.addEventListener('click', load);

//BOTON BUSCAR UNO
let btnBuscarUno = document.querySelector('#buscarUno');
btnBuscarUno.addEventListener('click', () => {
    limpiarCampos();
    btnAgregar.innerHTML="Agregar";
    btnAgregar.removeAttribute('idx');

    let btnEdit = document.querySelectorAll(".btnEditPorPos");
    btnEdit.forEach(btn => {
        btn.classList.remove("oculto");
    });

    btnBuscarUno.classList.add('d-none');
    document.querySelector('#buscarPorIndice').classList.remove('d-none');
    document.querySelector('#consultar').classList.remove('d-none');
});

//BOTON CONSULTAR
let btnConsultar = document.querySelector('#consultar');
btnConsultar.addEventListener('click', () => {
    limpiarCampos();
    btnAgregar.innerHTML="Agregar";
    btnAgregar.removeAttribute('idx');
    
    btnBuscarUno.classList.remove('d-none');
    document.querySelector('#buscarPorIndice').classList.add('d-none');
    document.querySelector('#consultar').classList.add('d-none');

    let index = document.querySelector('#buscarPorIndice').value;
    consultar(index);
});

let vehiculos = [];
load();

/* 
DIBUJA TABLA CON ELEMENTOS EN MEMORIA DEL ARRAY VEHICULOS
DIBUJA BOTON "E"(editar) para cada fila (contiene los valores de todos los campos de dicha fila y el tipo de objeto + una id unica).
DIBUJA BOTON "B"(borrar) para cada fila (contiene una id unica).
 */
function mostrarVehiculos(index) {
    try {
        html = "";
        let cap;
        let i = 0;
        if (index != null)
            i = parseInt(index) - 1;

        for (let r of vehiculos) {
            if (r != null) {
                if (r.capacidadBaul) {
                    cap = r.capacidadBaul;
                    tipo = "Auto";
                }
                else {
                    cap = r.capacidadCarga;
                    tipo = "Camioneta";
                }
                html += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${r.marca}</td>
                            <td>${r.modelo}</td>
                            <td>${parseInt(r.año)}</td>
                            <td>${r.patente}</td>
                            <td>${parseInt(r.precio)}</td>
                            <td>${parseInt(cap)}</td>
                            <td class="action">
                                <button type="button" class="btnEditPorPos btn-warning" idx=${i} datos=${tipo},${r.marca},${r.modelo},${r.año},${r.patente},${r.precio},${cap}>E</button>
                                <button type="button" class="btnElimPorPos btn-danger" idx=${i}>B</button>
                            </td>
                        </tr>`;
                i++;
            }
        }
        document.querySelector("#tableBody").innerHTML = html;

        let btnsEdit = document.querySelectorAll(".btnEditPorPos") //AGREGA EVENTO A TODOS LOS BOTONES "E"
        btnsEdit.forEach(e => {
            e.addEventListener("click", editarPosicion);
        });

        let btnsElim = document.querySelectorAll(".btnElimPorPos") //AGREGA EVENTO A TODOS LOS BOTONES "B"
        btnsElim.forEach(e => {
            e.addEventListener("click", eliminarPosicion);
        });

    } catch (err) {
        alert("Error al mostrar los datos");
    }
}

//CLICK EN BOTON "AGREGAR":
//TOMA LOS VALORES DE TODOS LOS INPUTS Y CREA UN JSON:
//SI EL BOTON TIENE ATRIBUTO "IDX", LLAMA A FUNCION AUXILIAR PARA HACER PUT, LE PASA EL JSON Y LA POSICION. ELIMINA EL IDX Y CAMBIA EL TEXTO A "AGREGAR"
//SI EL BOTON NO TIENE ATRIBUTO "IDX", LLAMA A FUNCION AUXILIAR PARA HACER POST PASANDOLE EL JSON
function agregar() {
    let select = document.querySelector('#tipo');
    select.classList.remove('is-invalid');
    let inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(inp => {
        inp.classList.remove('is-invalid');
    })
    try {

        let tipo = document.querySelector('#tipo').value;
        let marca = document.querySelector('#marca').value;
        let modelo = document.querySelector('#modelo').value;
        let año = document.querySelector('#año').value;
        let patente = document.querySelector('#patente').value;
        let precio = document.querySelector('#precio').value;
        let capacidad = document.querySelector('#capacidad').value;
        if ((tipo != "") && (marca != "") && (modelo != "") && (año != "") && (!isNaN(parseInt(año))) && patente != "" && precio != "" && !isNaN(parseInt(precio)) && capacidad != "" && !isNaN(parseInt(capacidad))) {
            limpiarCampos();

            let newVehiculo;
            if (tipo == "Auto") {
                newVehiculo = {
                    'tipo': tipo,
                    'marca': marca,
                    'modelo': modelo,
                    'año': parseInt(año),
                    'patente': patente,
                    'precio': parseInt(precio),
                    'capacidadBaul': parseInt(capacidad)
                }
            } else {
                newVehiculo = {
                    'tipo': tipo,
                    'marca': marca,
                    'modelo': modelo,
                    'año': parseInt(año),
                    'patente': patente,
                    'precio': parseInt(precio),
                    'capacidadCarga': parseInt(capacidad)
                }
            }

            if (btnAgregar.getAttribute('idx')) {
                modificarEnServidor(newVehiculo, btnAgregar.getAttribute('idx'));
                btnAgregar.removeAttribute('idx');
                btnAgregar.innerHTML = "Agregar";
            } else {
                agregarAServidor(newVehiculo);
            }
            load();

        } else {
            if (tipo == "")
                document.querySelector('#tipo').classList.add('is-invalid');
            if (marca == "")
                document.querySelector('#marca').classList.add('is-invalid');
            if (modelo == "")
                document.querySelector('#modelo').classList.add('is-invalid');
            if (año == "" || (isNaN(parseInt(año))))
                document.querySelector('#año').classList.add('is-invalid');
            if (patente == "")
                document.querySelector('#patente').classList.add('is-invalid');
            if ((precio == "") || (isNaN(parseInt(precio))))
                document.querySelector('#precio').classList.add('is-invalid');
            if ((capacidad == "") || (isNaN(parseInt(capacidad))))
                document.querySelector('#capacidad').classList.add('is-invalid');
        }

    } catch (err) {
        alert("No se pudo agregar el nuevo vehiculo.");
    }
}


//CLICK EN BOTONES "MOSTRAR AUTOS" Y "MOSTRAR CAMIONETAS"
//HACE FETCH AL GETBYTYPE(TIPO) DE LA API (@GET(:TIPO))
//DESACTIVA LOS BOTONES DE ACCION PARA CADA LINEA
async function mostrarPorTipo(tipo) {
    try {
        let r = await fetch(`/concesionaria/${tipo}`);
        let json = await r.json();
        vehiculos = json;
        mostrarVehiculos();
        disableActions();

    } catch (err) {
        alert("Error al consultar por tipo.");
    }
}

//CLICK A BOTONES "B"
// OBTIENE EL IDX DEL BOTON CLICKEADO Y SE LO PASA A LA FUNCION ELIMINARDESERVIDOR
function eliminarPosicion() {
    limpiarCampos();
    btnAgregar.innerHTML="Agregar";
    btnAgregar.removeAttribute('idx');
    let posicion = this.getAttribute("idx");
    if (!eliminarDeServidor(posicion))
        alert("Error eliminando en servidor");
    load();
}

// CLICK BOTONES "E"
// HACE VISIBLES TODOS LOS "E" MENOS EL CLICKEADO
// AGREGA ATRIBUTO IDX AL BOTON "AGREGAR" Y CAMBIA EL TEXTO POR "GUARDAR CAMBIOS"
// SETEA LOS INPUTS DEL FORMULARIO CON LOS VALORES DE LAS CELDAS
function editarPosicion() {
    let btnEdit = document.querySelectorAll(".btnEditPorPos");
    btnEdit.forEach(btn => {
        btn.classList.remove("oculto");
    });
    this.classList.add("oculto");

    let posicion = this.getAttribute("idx");
    btnAgregar.setAttribute('idx', posicion);
    btnAgregar.innerHTML = "Guardar Cambios";

    let datos = this.getAttribute("datos").split(',');

    document.querySelector('#tipo').value = datos[0];
    document.querySelector('#marca').value = datos[1];
    document.querySelector('#modelo').value = datos[2];
    document.querySelector('#año').value = datos[3];
    document.querySelector('#patente').value = datos[4];
    document.querySelector('#precio').value = datos[5];
    document.querySelector('#capacidad').value = datos[6];
}

//DESACTIVAR BOTONES DE ACCION
function disableActions() {
    let tdActionBtn = document.querySelectorAll('.action button');
    for (let i = 0; i < tdActionBtn.length; i++) {
        tdActionBtn[i].disabled = true;
        tdActionBtn[i].classList.remove('btn-warning', 'btn-danger');
    }
}

function limpiarCampos() {
    document.querySelector('#tipo').value = "";
    document.querySelector('#marca').value = "";
    document.querySelector('#modelo').value = "";
    document.querySelector('#año').value = "";
    document.querySelector('#patente').value = "";
    document.querySelector('#precio').value = "";
    document.querySelector('#capacidad').value = "";
}

//FETCH AL METODO CREATE DE LA API (@POST)
async function agregarAServidor(registro) {
    try {
        let r = await fetch("/concesionaria", {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(registro)
        });
        return (r.ok);

    } catch (err) {
        alert("Error de servidor al agrgar vehiculo");
    }
}

//FETCH AL METODO REMOVE DE LA API (@DELETE)
async function eliminarDeServidor(posicion) {
    try {
        let r = await fetch(`/concesionaria/${posicion}`, {
            "method": "DELETE",
            "headers": { "Content-Type": "application/json" }
        });
        return (r.ok);

    } catch (err) {
        alert("Error de servidor al eliminar vehiculo.");
    }
}

//FETCH AL METODO UPDATE DE LA API (@PUT)
async function modificarEnServidor(registro, posicion) {
    try {
        let r = await fetch(`/concesionaria/${posicion}`, {
            "method": "PUT",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(registro)
        });
        return (r.ok);

    } catch (err) {
        alert("Error de servidor al modificar vehiculo.");
    }
}

//FECTCH AL METODO GETONE DE LA API (@GET POS/:INDEX)
async function consultar(index) {
    let r = await fetch(`concesionaria/pos/${index}`);
    try {
        let json = await r.json();
        vehiculos = [];
        vehiculos.push(json);
        mostrarVehiculos(index);
        disableActions();
    } catch (err) {
        alert("Indice incorrecto");
    }

}

//FETCH AL METODO GETALL() DE LA API (@GET())- Almacena los datos en array "vehiculos"
async function load() {
    try {
        let r = await fetch("/concesionaria");
        let json = await r.json();
        vehiculos = json;
        mostrarVehiculos();

    } catch (err) {
        alert("Error de servidor al cargar la base de datos.");
    }
}