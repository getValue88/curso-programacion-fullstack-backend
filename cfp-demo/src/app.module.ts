import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';
import { TypeOrmModule } from'@nestjs/typeorm';
import { ProductoController } from'./producto/producto.controller';
import { ProductoService } from'./producto/producto.service';
import { CalculadoraController } from './calculadora/calculadora.controller';
import { CalculadoraService } from './calculadora/calculadora.service';
import { VehiculosModule } from './concesionaria/vehiculos/vehiculos.module';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot(),
    VehiculosModule,
  ],
  controllers: [AppController, ProductoController, CalculadoraController],
  providers: [AppService, ProductoService, CalculadoraService],
  exports:[]
})
export class AppModule { 

}
