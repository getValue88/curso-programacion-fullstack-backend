let btnCalcular = document.querySelector('#calcular');
btnCalcular.addEventListener('click', calcular);



async function calcular(){
    let operador = document.querySelector('#operador').value;
    let operando1 = document.querySelector('#op1').value;
    let operando2 = document.querySelector('#op2').value;

    await fetch(`/calculadora/${operador}/${operando1}/${operando2}`);
    mostrarOperaciones();
}

async function mostrarOperaciones(){
    let operaciones = [];
    operaciones = await fetch('/calculadora');
    operaciones = await operaciones.json();
    html = "";
    for (let r of operaciones) {
        html += `<tr>
                    <td>${r.operando1}</td>
                    <td>${r.op}</td>
                    <td>${r.operando2}</td>
                    <td>${r.resultado}</td>
                 </tr>`;
    }

    document.querySelector("#resultados").innerHTML = html;
}