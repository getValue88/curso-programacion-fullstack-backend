import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import Vehiculo from './entities/vehiculo.entity';
import { VehiculoDto } from './dto/vehiculo.dto';

@Controller('concesionaria')
export class ConcesionariaController {

    public constructor(private readonly concesionariaService: ConcesionariaService) { }
    /* 
        @Get()
        public getAll() {
            return this.concesionariaService.getAll();
        }
    
        @Get(':tipo')
        public getByType(@Param('tipo') tipo) {
            return this.concesionariaService.getByType(tipo);
        }
    
        @Get('pos/:index')
        public getOne(@Param('index') indice) {
            return this.concesionariaService.getOne(parseInt(indice));
        }
    
        @Post()
        public create(@Body() vehicle: any): string {
            this.concesionariaService.create(vehicle);
            return 'ok';
        }
    
        @Put(':id')
        public updateProductoPorPosicion(@Body() vehiculo: any, @Param('id') index): string {
            return this.concesionariaService.update(vehiculo, parseInt(index));
        }
    
        @Delete(':id')
        public deleteProductoPorPosicion(@Param('id') index): string {
            return this.concesionariaService.remove(parseInt(index));
        }
        */

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
