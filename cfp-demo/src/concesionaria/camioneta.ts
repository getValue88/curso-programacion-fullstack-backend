import Vehiculo from "./vehiculo";

export default class Camioneta extends Vehiculo {
    private capacidadCarga: number

    public constructor(marca: string, modelo: string, año: number, patente: string, precio: number, capacidadCarga: number) {
        super(marca, modelo, año, patente, precio);
        this.capacidadCarga = capacidadCarga;
    }

    public setCapacidad(capacidad: number): void {
        this.capacidadCarga = capacidad;
    }
    public getCapacidad(): number {
        return this.capacidadCarga;
    }
}