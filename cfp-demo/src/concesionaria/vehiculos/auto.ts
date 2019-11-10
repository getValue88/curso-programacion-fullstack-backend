import Vehiculo from "./entities/vehiculo.entity";

export default class Auto extends Vehiculo {

    private capacidadBaul: number

    public constructor(tipo:string,marca: string, modelo: string, año: number, patente: string, precio: number, capacidadBaul: number) {
        super(tipo,marca, modelo, año, patente, precio);
        this.capacidadBaul = capacidadBaul;
    }

    public setCapacidad(capacidad: number): void {
        this.capacidadBaul = capacidad;
    }
    public getCapacidad(): number {
        return this.capacidadBaul;
    }
}