import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { ProyectoService } from '../proyecto/proyecto.service';

@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService, ProyectoService],
})
export class ArchivoModule {}
