import { Simbolo } from '../Simbolo';

export class NombreClase {
  private nombre: string;
  private padre?: NombreClase;
  private variable: boolean;
  private simbolo: Simbolo;

  constructor(simbolo: Simbolo, nombre: string, variable: boolean = false) {
    this.nombre = nombre;
    this.variable = variable;
    this.simbolo = simbolo;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getVariable(): boolean {
    return this.variable;
  }

  public getSimbolo(): Simbolo {
    return this.simbolo;
  }

  public getPadre(): NombreClase | undefined {
    return this.padre;
  }
  public setPadre(value: NombreClase | undefined) {
    this.padre = value;
  }
}
