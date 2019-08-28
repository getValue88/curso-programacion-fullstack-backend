let targetDiv = document.querySelector('#target');

let agregar = document.querySelector('#agregar');
agregar.addEventListener('click', add);

let btnByAutor = document.querySelector('#byAutor');
btnByAutor.addEventListener('click', autorConMasDocs);

let btnMasUnAño = document.querySelector('#masUnAño');
btnMasUnAño.addEventListener('click', docsMasDeUnAño);

let btnByTema = document.querySelector('#byTema');
btnByTema.addEventListener('click', searchByTema);

let btnMasNuevo = document.querySelector('#ultimo');
btnMasNuevo.addEventListener('click', buscarMasNuevo);

let btnMasAntiguo = document.querySelector('#primero');
btnMasAntiguo.addEventListener('click', buscarMasAntiguo);

let btnMasTratado = document.querySelector('#masTema');
btnMasTratado.addEventListener('click', byTemaMasTratado);

let documentos = [];

async function load(){
    let r = await fetch("js/mock.json");
    let json = await r.json();
    documentos = json;
    mostrarDocumentos();
  }
  
load();

function add() {
    let autor = document.querySelector('#autor');
    let titulo = document.querySelector('#titulo');
    let temas = document.querySelector('#temas');
    let arrTemas = temas.value.split(',');
    let fecha = document.querySelector('#fecha');
    let formatFecha = new Date(fecha.value + 'T00:00').toLocaleDateString();

    let entry = {
        'titulo': titulo.value.trim(),
        'autor': autor.value.trim(),
        'temas': arrTemas.map((tema)=>{
           return tema.trim().toLowerCase();
        }),
        'fecha': formatFecha
    }
    documentos.push(entry);
    mostrarDocumentos();

    autor.value = '';
    titulo.value= '';
    temas.value='';
    fecha.value= '';
}

function mostrarDocumentos() {
    let resultados = document.querySelector('#resultados');

    let html = '';
    documentos.forEach((doc) => {
        html += `<tr>
                    <td>${doc.titulo}</td>
                    <td>${doc.autor}</td>
                    <td>${doc.temas}</td>
                    <td>${doc.fecha}</td>
                </tr>`
    });
    resultados.innerHTML = html;
}

function autorConMasDocs() {
    targetDiv.innerHTML = '';

    // obtener y almacenar cantidad de documentos de cada autor (key = nombreautor, value = cantidad de docs)
    let autores = {};
    documentos.forEach((doc) => {
        autores[doc.autor] = (autores[doc.autor] || 0) + 1;
    });

    // transformar el resultado a un array de 2 dimensiones
    let arr = [];
    Object.keys(autores).map((key) => {
        arr.push([key, autores[key]]);
    });

    // buscar la mayor cantidad de documentos escritos por X autor
    let maxDocs = 0;
    arr.forEach((autor) => {
        if (autor[1] > maxDocs)
            maxDocs = autor[1];
    });

    // mostrar informacion de todos los autores que tengan la mayor cantidad de documentos
    arr.forEach((autor) => {
        if (autor[1] == maxDocs) {
            targetDiv.innerHTML += `Autor: ${autor[0]} - Cantidad de documentos: ${autor[1]}<br>`
        }
    });
}

function docsMasDeUnAño() {
    let docCount = 0;
    let año = 31557600000; //año de 365.25 dias en milisegundos.
    let hoy = new Date();

    documentos.forEach((doc) => {
        let arr = doc.fecha.split('/');
        if ((hoy - new Date(arr[2], arr[1] - 1, arr[0])) > año)
            docCount++;
    });
    targetDiv.innerHTML = `Documentos con antiguedad mayor a un año: ${docCount}`;
}

function buscarMasNuevo() {
    targetDiv.innerHTML = '';
    let html = '';
    let masNuevo = 99999999999999999999999999999999999;
    let hoy = new Date();
    documentos.forEach((doc) => {
        let fecha = doc.fecha.split('/');
        if (hoy - new Date(fecha[2], fecha[1], fecha[0]) < masNuevo) {
            masNuevo = hoy - new Date(fecha[2], fecha[1], fecha[0]);
            html = `Titulo: ${doc.titulo} <br> Autor: ${doc.autor} <br> Temas: ${doc.temas} <br> Fecha: ${doc.fecha}`
        }
    });
    targetDiv.innerHTML = html;
}

function buscarMasAntiguo() {
    targetDiv.innerHTML = '';
    let html = '';
    let masAntiguo = 0;
    let hoy = new Date();
    documentos.forEach((doc) => {
        let fecha = doc.fecha.split('/');
        if (hoy - new Date(fecha[2], fecha[1], fecha[0]) > masAntiguo) {
            masAntiguo = hoy - new Date(fecha[2], fecha[1], fecha[0]);
            html = `Titulo: ${doc.titulo} <br> Autor: ${doc.autor} <br> Temas: ${doc.temas} <br> Fecha: ${doc.fecha}`
        }
    });
    targetDiv.innerHTML = html;
}

function searchByTema() {
    targetDiv.innerHTML = '';
    let input = document.querySelector('#byTemaInput').value;
    let docEncontrados = [];
    documentos.forEach((doc) => {
        doc.temas.forEach((tema) => {
            if (tema.trim().toLowerCase() == input.trim().toLowerCase())
                docEncontrados.push(doc);

        });
    });
    docEncontrados.forEach((doc) => {
        targetDiv.innerHTML += `Titulo: ${doc.titulo} <br> Autor: ${doc.autor} <br> Temas: ${doc.temas} <br> Fecha: ${doc.fecha}<br><br>`;
    });
}

function byTemaMasTratado() {
    targetDiv.innerHTML = '';

    let temas = {};
    documentos.forEach((doc) => {
        doc.temas.forEach((tema) => {
            temas[tema] = (temas[tema] || 0) + 1;
        })
    });

    let arr = [];
    Object.keys(temas).map((key) => {
        arr.push([key, temas[key]]);
    });

    let maxTema = 0;
    arr.forEach((tema) => {
        if (tema[1] > maxTema)
            maxTema = tema[1];
    });

    arr.forEach((tema) => {
        if (tema[1] == maxTema) {
            targetDiv.innerHTML += `Tema: ${tema[0]} - Cantidad de veces tratado: ${tema[1]}<br>`
        }
    });
}
