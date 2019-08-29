let btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", agregar);
let btnTotal = document.querySelector("#btnTotal");
btnTotal.addEventListener("click", sumar);

let compras = [];

load();

async function load(){
    let r = await fetch("/producto");
    let json = await r.json();
    compras = json;
    mostrarTablaCompras();
  }

function agregar() {
    console.log("Funcion Agregar");
    let producto = document.querySelector('#producto').value;
    let precio = parseInt(document.querySelector('#precio').value);
    let descripcion = document.querySelector('#descripcion').value;

    let renglon = {
        "producto_nombre": producto,
        "precio": precio,
        "desc": descripcion
    }

    compras.push(renglon);
    mostrarTablaCompras();
}

function sumar() {
    console.log("Funcion Sumar");
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += compras[i].precio;
    }

    let max = compras[0].precio;
    for (let r of compras) {
        if (max < r.precio)
            max = r.precio;
    }

    document.querySelector("#total").innerHTML = "<p>Total: $" + total + "</p>" + "<p>Maximo: $" + max + "</p>"
}

function mostrarTablaCompras() {
    html = "";
    for (let r of compras) {
        html += `<tr>
                    <td>${r.producto_nombre}</td>
                    <td>$${r.precio}</td>
                    <td>${r.desc}</td>
                 </tr>`;
    }

    document.querySelector("#tblCompras").innerHTML = html;
}