import { Injectable } from '@nestjs/common';
import Vehiculo from './entities/vehiculo.entity';
import Auto from './auto';
import Camioneta from './camioneta';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoDto } from './dto/vehiculo.dto';

@Injectable()
export class ConcesionariaService {

    constructor(@InjectRepository(Vehiculo) private readonly vehicleRepository: Repository<Vehiculo>) {

    }

    public async findAll(): Promise<Vehiculo[]> {
        return await this.vehicleRepository.find();
    }

    public async create(vehiculoDto: VehiculoDto): Promise<Vehiculo[]> {
        let newVehiculo;
        if (vehiculoDto['tipo'] == 'Auto') {
            newVehiculo = new Auto(
            vehiculoDto['tipo'],
            vehiculoDto['marca'],
            vehiculoDto['modelo'],
            vehiculoDto['año'],
            vehiculoDto['patente'],
            vehiculoDto['precio'],
            parseInt(vehiculoDto['capacidadBaul'])
            );
        }
        if (vehiculoDto['tipo'] == 'Camioneta') {
            newVehiculo = new Camioneta(
            vehiculoDto['tipo'],
            vehiculoDto['marca'],
            vehiculoDto['modelo'],
            vehiculoDto['año'],
            vehiculoDto['patente'],
            vehiculoDto['precio'],
            parseInt(vehiculoDto['capacidadCarga'])
            );
        }
        await this.vehicleRepository.save(newVehiculo);
        return await this.vehicleRepository.find();
    }

    public async getByType(tipo: string): Promise<Vehiculo[]> {
        return await this.vehicleRepository.find({ where: { tipo: `${tipo}` } });
    }

    public async getByPatente(patente: string): Promise<Vehiculo> {
        return await this.vehicleRepository.findOne(patente);
    }

    public async update(patente: string, vehiculoDTO: VehiculoDto): Promise<Vehiculo[]> {
        let toUpdateVehicle = await this.vehicleRepository.findOne(patente);
        
        toUpdateVehicle['tipo'] = vehiculoDTO.tipo;
        toUpdateVehicle['marca'] = vehiculoDTO.marca;
        toUpdateVehicle['modelo'] = vehiculoDTO.modelo;
        toUpdateVehicle['año'] = vehiculoDTO.año;
        toUpdateVehicle['precio'] = vehiculoDTO.precio;
        toUpdateVehicle['capacidad'] = vehiculoDTO.capacidad;

        await this.vehicleRepository.save(toUpdateVehicle);
        return await this.vehicleRepository.find();
    }

    public async delete(patente: string): Promise<Vehiculo[]> {
        await this.vehicleRepository.delete(patente);
        return await this.vehicleRepository.find();
    }
}
