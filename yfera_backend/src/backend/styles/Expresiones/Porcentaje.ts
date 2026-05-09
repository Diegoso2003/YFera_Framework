/* eslint-disable @typescript-eslint/no-unused-vars */
import { Simbolo } from '../../Simbolo';
import { AnalizadorStyles } from '../AnalizadorStyles';
import { Expresion } from './Expresion';

export class Porcentaje extends Expresion {
  private porcentaje: string;
  constructor(simbolo: Simbolo, porcentaje: string) {
    super(simbolo);
    this.porcentaje = porcentaje;
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    return this;
  }
  obtenerCompilado(): string {
    return this.porcentaje;
  }
}
