import { Injectable } from '@nestjs/common';
import Vehiculo from './vehiculo';
import Auto from './auto';
import Camioneta from './camioneta';
import * as fs from 'fs';

@Injectable()
export class ConcesionariaService {
    private vehiculos: Vehiculo[] = [];

    constructor() {
        this.load();
    }

    public getAll(): Vehiculo[] {
        console.log("\nVehiculos en memoria:");
        console.log(this.vehiculos);
        return this.vehiculos;
    }

    public getByType(type: string): Vehiculo[] {
        let vehicleByType: Vehiculo[] = [];
        this.vehiculos.forEach((veh) => {
            if (type == 'auto' && veh instanceof Auto) {
                vehicleByType.push(veh);
            }
            if (type == 'camioneta' && veh instanceof Camioneta) {
                vehicleByType.push(veh);
            }
        })
        console.log("\nVehiculos de tipo " + type);
        console.log(vehicleByType);
        return vehicleByType;
    }

    public getOne(index: number): Vehiculo {
        try {
            if (index >= 1 && index <= this.vehiculos.length) {
                console.log("\nVehiculo consultado:");
                console.log(this.vehiculos[index - 1]);
                return this.vehiculos[index - 1];
            }

        } catch (err) {
            throw new Error("Error de consulta");
        }
    }

    public create(vehicle: any): void {
        try {
            let vehiculo;
            if (vehicle['tipo'] == 'Auto') {
                vehiculo = new Auto(vehicle['marca'], vehicle['modelo'], parseInt(vehicle['año']), vehicle['patente'], parseInt(vehicle['precio']), parseInt(vehicle['capacidadBaul']));
            }
            if (vehicle['tipo'] == 'Camioneta') {
                vehiculo = new Camioneta(vehicle['marca'], vehicle['modelo'], parseInt(vehicle['año']), vehicle['patente'], parseInt(vehicle['precio']), parseInt(vehicle['capacidadCarga']));
            }
            this.vehiculos.push(vehiculo);
            console.log("\nNuevo vehiculo:");
            console.log(vehicle);
            this.save();

        } catch (err) {
            throw new Error("Error al agregar el nuevo vehiculo.");
        }
    }

    public remove(index: number): string {
        try {
            console.log("\nVehiculo nro" + (index + 1) + " Eliminado:");
            console.log(this.vehiculos[index]);
            this.vehiculos.splice(index, 1);
            this.save();
            return "ok";

        } catch (err) {
            throw new Error("Error al eliminar el vehiculo.");
        }
    }

    public update(vehiculo: any, index: number): string {
        try {
            let newVehicle;
            if (vehiculo['tipo'] == "Auto")
                newVehicle = new Auto(vehiculo['marca'], vehiculo['modelo'], vehiculo['año'], vehiculo['patente'], vehiculo['precio'], vehiculo['capacidadBaul']);
            else
                newVehicle = new Camioneta(vehiculo['marca'], vehiculo['modelo'], vehiculo['año'], vehiculo['patente'], vehiculo['precio'], vehiculo['capacidadCarga']);

            this.vehiculos[index] = newVehicle;
            console.log("\nVehiculo nro" + (index + 1) + " actualizado:");
            console.log(newVehicle);
            this.save();
            return "ok";

        } catch (err) {
            throw new Error("Error al actualizar vehiculo");
        }
    }

    private load() {
        try {
            let data = fs.readFileSync('src/concesionaria/bdd.csv', 'utf8');
            let arrData = [];
            if (data != "") {
                arrData = data.split('\n');
            }
            arrData.forEach((veh) => {
                let row = veh.split(',');
                let nuevoVehiculo;
                if (row[0] == "Auto")
                    nuevoVehiculo = new Auto(row[1], row[2], parseInt(row[3]), row[4], parseInt(row[5]), parseInt(row[6]));
                if (row[0] == "Camioneta")
                    nuevoVehiculo = new Camioneta(row[1], row[2], parseInt(row[3]), row[4], parseInt(row[5]), parseInt(row[6]));
                this.vehiculos.push(nuevoVehiculo);
            });

        } catch (err) {
            throw new Error("Error al cargar la base de datos.");
        }
    }

    private save(): void {
        try {
            fs.writeFileSync('src/concesionaria/bdd.csv', '', 'utf8');
            let tipo;
            let line;
            let i = 0;
            if (this.vehiculos.length > 0) {
                this.vehiculos.forEach(v => {
                    if (v instanceof Auto)
                        tipo = "Auto"
                    else
                        tipo = "Camioneta"

                    if (i == 0) {
                        line = `${tipo},${v.getMarca()},${v.getModelo()},${v.getAño()},${v.getPatente()},${v.getPrecio()},${v.getCapacidad()}`;
                        fs.appendFileSync('src/concesionaria/bdd.csv', line, 'utf8');
                    } else {
                        line = `\n${tipo},${v.getMarca()},${v.getModelo()},${v.getAño()},${v.getPatente()},${v.getPrecio()},${v.getCapacidad()}`;
                        fs.appendFileSync('src/concesionaria/bdd.csv', line, 'utf8');
                    }
                    i = 1;
                })
            }
            console.log("\nBase de datos actualizada");

        } catch (err) {
            throw new Error("Error al sobrescribir base de datos");
        }
    }

}
