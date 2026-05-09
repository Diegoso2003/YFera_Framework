import { RegistroErrores } from '../../../RegistroErrores';
import { AnalizadorStyles } from '../../AnalizadorStyles';
import { Expresion } from '../Expresion';
import { Numero } from '../Numero';
import { Operacion } from './Operacion';

export class Resta extends Operacion {
  private expr1: Expresion;
  private expr2: Expresion;
  constructor(expr1: Expresion, expr2: Expresion) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
    this.expr2 = expr2;
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    const errores = RegistroErrores.getInstance();
    if (!analizador.getUsoVariables()) {
      this.error = true;
      errores.agregarSimbolo(this.expr1.getSimbolo(), 'No se permiten expresiones númericas en este punto');
      return this;
    }
    const valor1 = this.expr1.obtenerValor(analizador);
    const valor2 = this.expr2.obtenerValor(analizador);
    if (!valor1.getError() && !valor2.getError()) {
      const num1 = valor1 as Numero;
      const num2 = valor2 as Numero;
      return new Numero(this.expr1.getSimbolo(), `${num1.getNumero() - num2.getNumero()}`);
    }
    this.error = true;
    return this;
  }
  obtenerCompilado(): string {
    return '0px';
  }
}
