import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import { VehiculoDto } from './dto/vehiculo.dto';

@Controller('concesionaria')
export class ConcesionariaController {

    public constructor(private readonly concesionariaService: ConcesionariaService) { }

    @Get()
    findAll() {
        return this.concesionariaService.findAll();
    }

    @Post()
    public create(@Body() vehiculoDTO: VehiculoDto) {
        return this.concesionariaService.create(vehiculoDTO);
    }

    @Get(':tipo')
    public getByType(@Param('tipo') tipo) {
        return this.concesionariaService.getByType(tipo);
    }

    @Get('patente/:pat')
    public getByPatente(@Param('pat') pat) {
        return this.concesionariaService.getByPatente(pat);
    }

    @Put(':patente')
    public update(@Param('patente') patente, @Body() vehiculo: VehiculoDto) {
        return this.concesionariaService.update(patente, vehiculo);
    }

    @Delete(':patente')
    public delete(@Param('patente') patente) {
        return this.concesionariaService.delete(patente);
    }

} 
