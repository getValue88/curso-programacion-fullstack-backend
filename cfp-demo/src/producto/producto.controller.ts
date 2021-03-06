import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService) { }

    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    @Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(parseInt(index));
    }

    @Post()
    create(@Body() prod: Producto): string {
        this.productoService.create(prod);
        return 'ok';
    }
}
