import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';

import { ProductoController } from'./producto/producto.controller';
import { ProductoService } from'./producto/producto.service';
import { CalculadoraController } from './calculadora/calculadora.controller';
import { CalculadoraService } from './calculadora/calculadora.service';
import { ConcesionariaController} from './concesionaria/concesionaria.controller';
import { ConcesionariaService } from './concesionaria/concesionaria.service';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController, ProductoController, CalculadoraController,ConcesionariaController],
  providers: [AppService, ProductoService, CalculadoraService,ConcesionariaService],
})
export class AppModule { }
