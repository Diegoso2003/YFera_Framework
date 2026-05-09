import { Compilador } from '../compiladores/Compilador';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';

export abstract class ValorInput {
  protected expr: ExpresionCompi;
  constructor(expr: ExpresionCompi) {
    this.expr = expr;
  }
  abstract analizar(compilador: Compilador, tipo: Tipo): string;
}
