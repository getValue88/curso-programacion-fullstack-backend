import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auto from './entities/auto.entity';
import Camioneta from './entities/camioneta.entity';
import Vehiculo from './entities/vehiculo.entity';
import { ConcesionariaService } from './concesionaria.service';
import { ConcesionariaController } from './concesionaria.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Auto,Camioneta,Vehiculo])],
    controllers:[ConcesionariaController],
    providers:[ConcesionariaService]
})
export class VehiculosModule {}
