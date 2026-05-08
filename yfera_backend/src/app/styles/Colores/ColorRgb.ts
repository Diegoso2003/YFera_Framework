import { Expresion } from '../Expresiones/Expresion';
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
}
