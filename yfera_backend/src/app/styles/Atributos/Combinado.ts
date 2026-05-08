import { ClaseColor } from '../Colores/ClaseColor';
import { Expresion } from '../Expresiones/Expresion';

export class Combinado {
  private expr: Expresion;
  private estilo: string;
  private color: ClaseColor;

  constructor(expr: Expresion, estilo: string, color: ClaseColor) {
    this.expr = expr;
    this.estilo = estilo;
    this.color = color;
  }
}
