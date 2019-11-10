import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vehiculo from './entities/vehiculo.entity';
import { ConcesionariaService } from './concesionaria.service';
import { ConcesionariaController } from './concesionaria.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Vehiculo])],
    controllers:[ConcesionariaController],
    providers:[ConcesionariaService]
})
export class VehiculosModule {}
