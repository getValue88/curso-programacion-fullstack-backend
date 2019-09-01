import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoService {
    private static readonly CANTIDAD_PRODUCTOS = 10;
    private productos = [
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
        },
        {
            'producto_nombre': 'jabon',
            'precio': 20,
            'desc': 'unidad'
        }
    ];

    public getProductos(): any {
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
        return this.productos;
    }

    public getProducto(p1: number, p2: number, p3: number, p4: number): any {
        let productos = [];

        for (let i = 0; i < this.productos.length; i++) {
            if (i == p1 - 1 || i == p2 - 1 || i == p3 - 1 || i == p4 - 1) {
                productos.push(this.productos[i]);
            }
        }
        return productos;
    }
}

