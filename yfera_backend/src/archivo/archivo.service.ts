import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArchivoDto, TipoArchivo } from './dto/create-archivo.dto';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ProyectoService } from '../proyecto/proyecto.service';
import { Contenido } from './dto/archivo-contenido.dto';

@Injectable()
export class ArchivoService {
  constructor(private readonly proyectoService: ProyectoService) {}

  async create(createArchivoDto: CreateArchivoDto): Promise<void> {
    const rutaCarpeta = path.join(this.proyectoService.proyectosPath, createArchivoDto.carpeta);
    const existe = await this.proyectoService.carpetaExiste(rutaCarpeta);
    if (!existe) {
      throw new NotFoundException(`no se encontro la carpeta '${createArchivoDto.carpeta}'`);
    }
    const carpeta = await fs.stat(rutaCarpeta);
    if (!carpeta.isDirectory()) {
      throw new BadRequestException(`la ruta '${createArchivoDto.carpeta}' no es valida`);
    }
    const nuevo = path.join(rutaCarpeta, this.nombreCompleto(createArchivoDto));
    const conflicto = await this.proyectoService.carpetaExiste(nuevo);
    if (conflicto) {
      throw new ConflictException('Ya existe un archivo con este nombre en la misma ruta, por favor escriba otro');
    }
    if (createArchivoDto.tipo === TipoArchivo.CARPETA) {
      await fs.mkdir(nuevo);
    } else {
      await fs.writeFile(nuevo, '');
    }
  }

  async findOne(nombreArchivo: string) {
    if (!nombreArchivo) {
      throw new BadRequestException('El nombre del archivo es requerido');
    }
    const rutaCompleta = path.join(this.proyectoService.proyectosPath, nombreArchivo);
    try {
      const contenido = await fs.readFile(rutaCompleta, 'utf8');
      return {
        contenido: contenido,
      };
    } catch {
      throw new NotFoundException('Error al leer el archivo intente más tarde');
    }
  }

  async update(contenido: Contenido): Promise<void> {
    const rutaArchivo = path.join(this.proyectoService.proyectosPath, contenido.rutaArchivo);
    const existe = await this.proyectoService.carpetaExiste(rutaArchivo);
    if (!existe) {
      throw new NotFoundException(`no se encontro el archivo con ruta: '${contenido.contenido}'`);
    }
    const carpeta = await fs.stat(rutaArchivo);
    if (!carpeta.isFile()) {
      throw new BadRequestException(`la ruta '${contenido.contenido}' no es valida`);
    }
    await fs.writeFile(rutaArchivo, contenido.contenido, 'utf-8');
  }

  async remove(ruta: string): Promise<void> {
    if (!ruta) {
      throw new BadRequestException(`Envie una ruta valida`);
    }
    const rutaCarpeta = path.join(this.proyectoService.proyectosPath, ruta);
    const existe = await this.proyectoService.carpetaExiste(rutaCarpeta);
    if (!existe) {
      throw new NotFoundException(`Archivo con ruta '${ruta}' no se encontro`);
    }
    await fs.rm(rutaCarpeta, { recursive: true, force: true });
  }

  nombreCompleto(nuevo: CreateArchivoDto): string {
    switch (nuevo.tipo) {
      case TipoArchivo.CARPETA:
        return nuevo.nombre;
      case TipoArchivo.COMPONENT:
        return `${nuevo.nombre}.component`;
      case TipoArchivo.STYLES:
        return `${nuevo.nombre}.styles`;
      case TipoArchivo.PRINCIPAL:
        return `${nuevo.nombre}.y`;
    }
  }
}
