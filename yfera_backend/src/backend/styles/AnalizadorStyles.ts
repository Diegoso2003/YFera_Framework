/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RegistroErrores } from '../RegistroErrores';
import { Clase } from './Clase';
import { NodoEstilo } from './NodoEstilo';

export class AnalizadorStyles {
  private clases: Map<string, Map<string, string>> = new Map();
  private usoVariables: boolean = false;
  private variableActual: string = '';
  private valorActual: number = 0;
  analizar(input: string): void {
    const errores = RegistroErrores.getInstance();
    try {
      const parser = require('../analizadores/styles.js');
      const resultado = parser.parse(input) as NodoEstilo[];
      resultado.forEach((nodo) => {
        nodo.analizar(this);
      });
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
  }

  public agregarClase(nombre: string, compilado: Map<string, string>, clase: Clase) {
    const errores = RegistroErrores.getInstance();
    if (this.clases.has(nombre)) {
      errores.agregarSimbolo(clase.getNombre().getSimbolo(), 'clase con nombre repetido');
    }
    this.clases.set(nombre, compilado);
  }

  public getClases(): Map<string, Map<string, string>> {
    return this.clases;
  }

  public getUsoVariables(): boolean {
    return this.usoVariables;
  }
  public setUsoVariables(value: boolean) {
    this.usoVariables = value;
  }

  public getVariableActual(): string {
    return this.variableActual;
  }
  public setVariableActual(value: string) {
    this.variableActual = value;
  }

  public getValorActual(): number {
    return this.valorActual;
  }
  public setValorActual(value: number) {
    this.valorActual = value;
  }
}
