import { RegistroErrores } from '../../../RegistroErrores';
import { Simbolo } from '../../../Simbolo';
import { AnalizadorStyles } from '../../AnalizadorStyles';
import { Expresion } from '../Expresion';
import { Numero } from '../Numero';
import { Operacion } from './Operacion';

export class Modulo extends Operacion {
  private expr1: Expresion;
  private expr2: Expresion;
  constructor(expr1: Expresion | string, expr2: Expresion) {
    super(expr2.getSimbolo());
    if (typeof expr1 === 'string') {
      const simb2 = expr2.getSimbolo();
      this.expr1 = new Numero(
        new Simbolo(expr1.replace('%', ''), simb2.getLinea(), simb2.getColumna()),
        expr1.replace('%', ''),
      );
    } else {
      this.expr1 = expr1;
    }
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
      const resultado = num1.getNumero() + num2.getNumero();
      if (isNaN(resultado)) {
        this.error = true;
        errores.agregarSimbolo(this.expr1.getSimbolo(), 'No se permite la divison por 0');
        return this;
      }
      return new Numero(this.expr1.getSimbolo(), `${resultado}`);
    }
    this.error = true;
    return this;
  }
  obtenerCompilado(): string {
    return '0px';
  }
}
