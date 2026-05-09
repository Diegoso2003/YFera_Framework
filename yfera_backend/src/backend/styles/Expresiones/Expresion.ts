import { Simbolo } from '../../Simbolo';
import { AnalizadorStyles } from '../AnalizadorStyles';

export abstract class Expresion {
  protected error: boolean = false;
  protected simbolo: Simbolo;
  constructor(simbolo: Simbolo, error: boolean = false) {
    this.simbolo = simbolo;
    this.error = error;
  }

  abstract obtenerValor(analizador: AnalizadorStyles): Expresion;
  abstract obtenerCompilado(): string;
  public getError(): boolean {
    return this.error;
  }
  public setError(value: boolean) {
    this.error = value;
  }

  public getSimbolo(): Simbolo {
    return this.simbolo;
  }
}
