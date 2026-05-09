/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistroErrores } from '../../RegistroErrores';
import { Simbolo } from '../../Simbolo';
import { AnalizadorStyles } from '../AnalizadorStyles';
import { Expresion } from './Expresion';

export class Numero extends Expresion {
  private numero: number;
  constructor(simbolo: Simbolo, numero: string, error: boolean = false) {
    super(simbolo, error);
    this.numero = Number(numero);
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    return this;
  }
  obtenerCompilado(): string {
    const errores = RegistroErrores.getInstance();
    if (this.numero < 0) {
      errores.agregarError({
        linea: this.simbolo.getLinea(),
        columna: this.simbolo.getColumna(),
        lexema: '-',
        tipo: 'Semántico',
        descripcion: 'el valor no es valido',
      });
    }
    return this.numero + 'px';
  }

  public getNumero(): number {
    return this.numero;
  }
}
