import { Controller, Get, Post, Body, Patch, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { Contenido } from './dto/archivo-contenido.dto';

@Controller('archivo')
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArchivoDto: CreateArchivoDto) {
    await this.archivoService.create(createArchivoDto);
  }

  @Get()
  async findOne(@Query('ruta') ruta: string) {
    return await this.archivoService.findOne(ruta);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Body() contenido: Contenido) {
    await this.archivoService.update(contenido);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async remove(@Query('ruta') ruta: string) {
    await this.archivoService.remove(ruta);
  }
}
