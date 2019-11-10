import Vehiculo from "./entities/vehiculo.entity";

export default class Camioneta extends Vehiculo {

    private capacidadCarga: number

    public constructor(tipo:string,marca: string, modelo: string, año: number, patente: string, precio: number, capacidadCarga: number) {
        super(tipo,marca, modelo, año, patente, precio);
        this.capacidadCarga = capacidadCarga;
    }

    public setCapacidad(capacidad: number): void {
        this.capacidadCarga = capacidad;
    }
    public getCapacidad(): number {
        return this.capacidadCarga;
    }
}