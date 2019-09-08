export class Producto {
    private nombreProducto: string;
    private precio: number;
    private desc: string;

    public constructor(nombreProducto: string, precio: number, desc: string) {
        this.nombreProducto = nombreProducto;
        this.precio = precio;
        this.desc = desc;
    }

    public getNombreProducto(): string {
        return this.nombreProducto;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getDesc(): string {
        return this.desc;
    }
}