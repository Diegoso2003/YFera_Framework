import { AnalizadorStyles } from '../../AnalizadorStyles';
import { Expresion } from '../Expresion';
import { Numero } from '../Numero';
import { Operacion } from './Operacion';

export class Negativo extends Operacion {
  private expr1: Expresion;
  constructor(expr1: Expresion) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    const valor = this.expr1.obtenerValor(analizador);
    if (valor.getError()) {
      return valor;
    }
    const resultado = valor as Numero;
    return new Numero(this.expr1.getSimbolo(), `${resultado.getNumero() * -1}`);
  }
  obtenerCompilado(): string {
    throw new Error('Method not implemented.');
  }
}
