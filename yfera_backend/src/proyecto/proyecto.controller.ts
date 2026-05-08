import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    return await this.proyectoService.create(createProyectoDto);
  }

  @Get()
  async findAll() {
    return await this.proyectoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.proyectoService.findOne(id);
  }

  @Get('arbol/:nombre')
  async descargarArbolTrabajo(@Param('nombre') nombre: string): Promise<StreamableFile> {
    return await this.proyectoService.descargarArbolDeTrabajo(nombre);
  }

  @Get('compilar/:nombre')
  compilar() {}

  @Get('compilado/:nombre')
  obtenerCompilado() {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(+id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }
}
