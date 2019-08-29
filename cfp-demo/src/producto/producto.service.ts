import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoService {
    private static readonly CANTIDAD_PRODUCTOS = 10;

    public getProducto(): any {
        let productos = [
            {
                'producto_nombre': 'papa',
                'precio': 20,
                'desc': 'kg.'
            },
            {
                'producto_nombre': 'Coca Cola',
                'precio': 100,
                'desc': '1.5 lts.'
            },
            {
                'producto_nombre': 'Coca Cola',
                'precio': 135,
                'desc': '2.25 lts.'
            },
            {
                'producto_nombre': 'Coca Cola',
                'precio': 160,
                'desc': '3 lts.'
            }
        ];

        /* 
        // info dinamica
        for (let i = 0; i < ProductoService.CANTIDAD_PRODUCTOS; i++) {
            let producto = {
                'producto_nombre': 'producto_' + i,
                'precio': Math.floor(Math.random() * 100),
                'desc': Math.random() * 100
            };
            productos.push(producto);
        } */
        return productos;

    }
}

