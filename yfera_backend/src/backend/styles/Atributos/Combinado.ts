import { ClaseColor } from '../Colores/ClaseColor';
import { Expresion } from '../Expresiones/Expresion';

export class Combinado {
  private expr: Expresion;
  private estilo: string;
  private color: ClaseColor;

  constructor(expr: Expresion, estilo: string, color: ClaseColor) {
    this.expr = expr;
    if (estilo === 'line') {
      this.estilo = 'solid';
    } else {
      this.estilo = estilo;
    }
    this.color = color;
  }

  public getExpr(): Expresion {
    return this.expr;
  }

  public getEstilo(): string {
    return this.estilo;
  }

  public getColor(): ClaseColor {
    return this.color;
  }
}
