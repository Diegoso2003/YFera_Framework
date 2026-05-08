import { RegistroErrores } from '../../RegistroErrores';
import { AnalizadorStyles } from '../AnalizadorStyles';
import { Expresion } from '../Expresiones/Expresion';
import { Numero } from '../Expresiones/Numero';
import { ClaseColor } from './ClaseColor';

export class ColorRgb extends ClaseColor {
  private expr1: Expresion;
  private expr2: Expresion;
  private expr3: Expresion;

  constructor(expr1: Expresion, expr2: Expresion, expr3: Expresion) {
    super();
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.expr3 = expr3;
  }

  analizar(analizador: AnalizadorStyles): string {
    const val1 = this.validarExpresion(this.expr1, analizador);
    const val2 = this.validarExpresion(this.expr2, analizador);
    const val3 = this.validarExpresion(this.expr3, analizador);
    return `rgb(${val1}, ${val2}, ${val3})`;
  }

  private validarExpresion(expr: Expresion, analizador: AnalizadorStyles): string {
    const valor = expr.obtenerValor(analizador);
    if (!valor.getError()) {
      const resultado = (valor as Numero).getNumero();
      if (resultado < 0 || resultado > 255) {
        const errores = RegistroErrores.getInstance();
        errores.agregarSimbolo(expr.getSimbolo(), 'El valor debe estar en el rango de 0 a 255');
      }
      return `${resultado}`;
    }
    return 'error';
  }
}
