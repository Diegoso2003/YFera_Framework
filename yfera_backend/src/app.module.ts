import { Module } from '@nestjs/common';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ArchivoModule } from './archivo/archivo.module';

@Module({
  imports: [ProyectoModule, ArchivoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
