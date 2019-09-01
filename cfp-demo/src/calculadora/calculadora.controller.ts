import { Controller, Get, Param } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {
    constructor(private readonly calculadoraService: CalculadoraService) { }

    @Get()
    public getAll(){
        return this.calculadoraService.getOperaciones();
    }

    @Get(':operador/:operando1/:operando2')
    public calcular(@Param('operador') operador, @Param('operando1') operando1, @Param('operando2') operando2) {
        return this.calculadoraService.getCalculo(operador, operando1, operando2);
    }
}
