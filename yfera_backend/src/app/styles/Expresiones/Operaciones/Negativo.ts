import { AnalizadorStyles } from '../../AnalizadorStyles';
import { Expresion } from '../Expresion';
import { Operacion } from './Operacion';

export class Negativo extends Operacion {
  private expr1: Expresion;
  constructor(expr1: Expresion) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    throw new Error('Method not implemented.');
  }
  obtenerCompilado(): string {
    throw new Error('Method not implemented.');
  }
}
