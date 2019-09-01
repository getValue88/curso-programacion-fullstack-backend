import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
    private operaciones = [];
    public getCalculo(operador, operando1, operando2) {
        switch (operador) {
            case '+': {
                let operacion = {
                    'op': operador,
                    'operando1':operando1,
                    'operando2': operando2,
                    'resultado': parseFloat(operando1) + parseFloat(operando2)
                }
                this.operaciones.push(operacion);
                break;
            }
            case '-': {
                let operacion = {
                    'op': operador,
                    'operando1':operando1,
                    'operando2': operando2,
                    'resultado': parseFloat(operando1) - parseFloat(operando2)
                }
                this.operaciones.push(operacion);
                break;
            }
            case '*': {
                let operacion = {
                    'op': operador,
                    'operando1':operando1,
                    'operando2': operando2,
                    'resultado': parseFloat(operando1) * parseFloat(operando2)
                }
                this.operaciones.push(operacion);
                break;
            }
            case '@': {
                let operacion = {
                    'op': '/',
                    'operando1':operando1,
                    'operando2': operando2,
                    'resultado': parseFloat(operando1) / parseFloat(operando2)
                }
                this.operaciones.push(operacion);
                break;
            }
            case '^': {
                let operacion = {
                    'op': operador,
                    'operando1':operando1,
                    'operando2': operando2,
                    'resultado': parseFloat(operando1) ** parseFloat(operando2)
                }
                this.operaciones.push(operacion);
                break;
            }
        }
    }

    public getOperaciones(){
        return this.operaciones;
    }
}
