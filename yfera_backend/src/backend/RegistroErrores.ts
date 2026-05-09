import { ArchivoErrores } from './models/ArchivoErrores';
import { MensajeError } from './models/MensajeError';
import { Simbolo } from './Simbolo';

export class RegistroErrores {
  private static instance: RegistroErrores;
  private errores: ArchivoErrores[] = [];
  private actual!: ArchivoErrores;
  private añadido: boolean = false;

  private constructor() {}

  public static getInstance(): RegistroErrores {
    if (!RegistroErrores.instance) {
      RegistroErrores.instance = new RegistroErrores();
    }
    return RegistroErrores.instance;
  }

  public iniciarAnalisis(ruta: string) {
    this.actual = {
      ruta: ruta,
      errores: [],
    };
    this.añadido = false;
  }

  public agregarError(error: MensajeError): void {
    this.actual.errores.push(error);
  }

  public agregarSimbolo(error: Simbolo, descripcion: string): void {
    this.actual.errores.push({
      lexema: error.getLexema(),
      linea: error.getLinea(),
      columna: error.getColumna(),
      descripcion: descripcion,
      tipo: 'Semántico',
    });
  }

  public clear(): void {
    this.errores = [];
  }

  public erroresActual(): number {
    return this.actual.errores.length;
  }

  public añadirActual(): void {
    if (this.actual.errores.length > 0) {
      if (!this.añadido) {
        this.errores.push(this.actual);
        this.añadido = true;
      }
    }
  }

  public getErrorCount(): number {
    return this.errores.length;
  }

  public getErrores(): ArchivoErrores[] {
    return this.errores;
  }
}
