import { Controller, Get } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService) { }

    @Get()
    public getProducto(): string {
        return this.productoService.getProducto()
    }

}
