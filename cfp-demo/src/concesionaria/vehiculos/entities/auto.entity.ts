import Vehiculo from "./vehiculo.entity";
import { Column, Entity, PrimaryGeneratedColumn} from'typeorm';

@Entity()
export default class Auto extends Vehiculo {

    @Column()
    private capacidadBaul: number

    public constructor(marca: string, modelo: string, año: number, patente: string, precio: number, capacidadBaul: number) {
        super(marca, modelo, año, patente, precio);
        this.capacidadBaul = capacidadBaul;
    }

    public setCapacidad(capacidad: number): void {
        this.capacidadBaul = capacidad;
    }
    public getCapacidad(): number {
        return this.capacidadBaul;
    }
}