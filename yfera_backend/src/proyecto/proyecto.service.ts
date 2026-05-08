import { BadRequestException, ConflictException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import * as path from 'path';
import * as fs from 'fs/promises';
import { EstructuraProyecto } from './dto/estructura-proyecto.dto';
import archiver from 'archiver';

@Injectable()
export class ProyectoService {
  public readonly proyectosPath = path.join(process.cwd(), 'data', 'proyectos');

  async create(createProyectoDto: CreateProyectoDto) {
    const rutaProyecto = path.join(this.proyectosPath, createProyectoDto.nombre);
    const existe = await this.carpetaExiste(rutaProyecto);
    if (existe) {
      throw new ConflictException(`El proyecto '${createProyectoDto.nombre}' ya existe`);
    }
    try {
      await fs.mkdir(this.proyectosPath, { recursive: true });
      await fs.mkdir(rutaProyecto, { recursive: true });
      const dbPath = path.join(rutaProyecto, `${createProyectoDto.nombre}.db`);
      await fs.writeFile(dbPath, '');
    } catch {
      throw new BadRequestException('Error al crear el proyecto porfavor intente más tarde');
    }
    return createProyectoDto;
  }

  async findAll() {
    return await fs.readdir(this.proyectosPath);
  }

  async findOne(id: string): Promise<EstructuraProyecto> {
    const rutaProyecto = path.join(this.proyectosPath, id);
    const existe = await this.carpetaExiste(rutaProyecto);
    if (!existe) {
      throw new NotFoundException(`No se encontro el proyecto '${id}'`);
    }
    const estructura = await this.explorarDirectorio(rutaProyecto, id, id);
    return estructura;
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }

  private async explorarDirectorio(
    rutaActual: string,
    nombre: string,
    rutaRelativa: string,
  ): Promise<EstructuraProyecto> {
    const elementos = await fs.readdir(rutaActual, { withFileTypes: true });
    const hijos: EstructuraProyecto[] = [];
    for (const elemento of elementos) {
      if (elemento.isFile() && elemento.name.endsWith('.db')) {
        continue;
      }
      const rutaCompleta = path.join(rutaActual, elemento.name);
      const nuevaRutaRelativa = path.join(rutaRelativa, elemento.name);

      if (elemento.isDirectory()) {
        const subEstructura = await this.explorarDirectorio(rutaCompleta, elemento.name, nuevaRutaRelativa);
        hijos.push(subEstructura);
      } else {
        hijos.push({
          nombre: elemento.name,
          ruta: nuevaRutaRelativa,
          carpeta: false,
          hijos: [],
        });
      }
    }

    return {
      nombre: nombre,
      ruta: rutaRelativa,
      carpeta: true,
      hijos,
    };
  }

  async carpetaExiste(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async descargarArbolDeTrabajo(nombre: string): Promise<StreamableFile> {
    const rutaCompleta = path.join(this.proyectosPath, nombre);
    const existe = await this.carpetaExiste(rutaCompleta);
    if (!existe) {
      throw new NotFoundException(`No se encontro el proyecto '${nombre}'`);
    }
    await fs.access(rutaCompleta, fs.constants.F_OK);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.directory(rutaCompleta, path.basename(`${nombre}`));
    await archive.finalize();
    return new StreamableFile(archive, {
      type: 'application/zip',
      disposition: `attachment; filename="${nombre}.zip"`,
    });
  }
}
