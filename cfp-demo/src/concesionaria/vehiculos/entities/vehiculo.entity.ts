import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicle')
export default abstract class Vehiculo {
    @Column({ nullable: true })
    private tipo?: string;

    @Column()
    private marca: string;

    @Column()
    private modelo: string;

    @Column()
    private año: number;

    @PrimaryGeneratedColumn()
    private patente: string;

    @Column()
    private precio: number;

    @Column({ nullable: true })
    private capacidad: number;

    public constructor(tipo:string,marca: string, modelo: string, año: number, patente: string, precio: number) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.patente = patente;
        this.precio = precio;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }
    public setAño(año: number): void {
        this.año = año;
    }
    public setPatente(patente: string): void {
        this.patente = patente;
    }
    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getMarca(): string {
        return this.marca;
    }
    public getModelo(): string {
        return this.modelo;
    }
    public getAño(): number {
        return this.año;
    }
    public getPatente(): string {
        return this.patente;
    }
    public getPrecio(): number {
        return this.precio;
    }

    public abstract setCapacidad(capacidad: number): void;
    public abstract getCapacidad(): number;
}