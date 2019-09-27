import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';

@Controller('concesionaria')
export class ConcesionariaController {

    public constructor(private readonly concesionariaService: ConcesionariaService) { }

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
}
