import { Compilador } from '../compiladores/Compilador';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Parentesis extends ExpresionCompi {
  private expr: ExpresionCompi;
  constructor(expr: ExpresionCompi) {
    super(expr.getSimbolo());
    this.expr = expr;
  }
  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const resultado = this.expr.analizar(analizador);
    return { tipo: resultado.tipo, texto: `(${resultado.texto})` };
  }
}
