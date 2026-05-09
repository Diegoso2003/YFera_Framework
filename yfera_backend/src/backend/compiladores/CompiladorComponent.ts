/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Componente } from '../component/Componente';
import { RegistroErrores } from '../RegistroErrores';
import { Tipo } from '../Tipo';
import { Compilador } from './Compilador';

export class CompiladorComponent extends Compilador {
  private parametros: Tipo[] = [];
  private posicionFuncion: Map<number, Tipo[]> = new Map();
  private parametrosFunciones: Map<string, Tipo[]> = new Map();
  private clases: Set<string> = new Set();
  private nombre: string = '';
  private cantidadF: number = 0;
  analizar(input: string): string {
    const errores = RegistroErrores.getInstance();
    try {
      const parser = require('../analizadores/component.js');
      const resultado = parser.parse(input) as Componente;
      return resultado.analizar(this);
    } catch (error: any) {
      console.log(error);
      errores.agregarError({
        lexema: '',
        linea: 0,
        columna: 0,
        descripcion: 'El parser no se pudo recuperar',
        tipo: 'Fatal',
      });
    }
    return '';
  }

  public getParametros(): Tipo[] {
    return this.parametros;
  }
  public setParametros(value: Tipo[]) {
    this.parametros = value;
  }

  public getPosicionFuncion(): Map<number, Tipo[]> {
    return this.posicionFuncion;
  }
  public setPosicionFuncion(value: Map<number, Tipo[]>) {
    this.posicionFuncion = value;
  }

  public getParametrosFunciones(): Map<string, Tipo[]> {
    return this.parametrosFunciones;
  }
  public setParametrosFunciones(value: Map<string, Tipo[]>) {
    this.parametrosFunciones = value;
  }

  public getClases(): Set<string> {
    return this.clases;
  }
  public setClases(value: Set<string>) {
    this.clases = value;
  }

  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(value: string) {
    this.nombre = value;
  }

  public getCantidadF(): number {
    return this.cantidadF++;
  }
}
