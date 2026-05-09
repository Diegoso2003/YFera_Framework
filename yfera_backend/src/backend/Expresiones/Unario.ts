import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Unario extends ExpresionCompi {
  private valor: string;
  private expr: ExpresionCompi;

  constructor(valor: string, expr: ExpresionCompi) {
    super(expr.getSimbolo());
    this.valor = valor;
    this.expr = expr;
  }
  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const resultado = this.expr.analizar(analizador);
    const tipo = resultado.tipo.getTipo();
    const arreglo = resultado.tipo.getArreglo();
    if ((tipo !== Tipo.ENTERO && tipo !== Tipo.ERROR && tipo !== Tipo.FLOAT) || arreglo) {
      analizador.agregarError(this.simbolo, 'la variable no soporta la operacion ' + this.valor);
      return { tipo: new TipoVar('error'), texto: '' };
    }
    return { tipo: resultado.tipo, texto: `${this.valor} ${resultado.texto}` };
  }
}
