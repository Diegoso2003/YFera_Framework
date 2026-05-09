import { Compilador } from '../compiladores/Compilador';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';

export class Comparacion extends ExpresionCompi {
  private expr1: ExpresionCompi;
  private expr2: ExpresionCompi;
  private com: string;
  private compara: boolean;

  constructor(expr1: ExpresionCompi, comp: string, expr2: ExpresionCompi, compara: boolean = false) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.com = comp;
    this.compara = compara;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const res1 = this.expr1.analizar(analizador);
    const res2 = this.expr2.analizar(analizador);
    if (res1.tipo.getTipo() === Tipo.ERROR || res2.tipo.getTipo() === Tipo.ERROR) {
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (res1.tipo.getTipo() !== res2.tipo.getTipo()) {
      analizador.agregarError(this.expr1.getSimbolo(), 'No se pueden comparar variables de diferente tipo');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (res1.tipo.getTipo() === Tipo.BOOLEAN && this.compara) {
      return { tipo: new TipoVar('boolean'), texto: `${res1.texto} ${this.com}= ${res2.texto}` };
    }
    if (
      res1.tipo.getTipo() !== Tipo.CHAR &&
      res1.tipo.getTipo() !== Tipo.ENTERO &&
      res1.tipo.getTipo() !== Tipo.FLOAT &&
      res1.tipo.getTipo() !== Tipo.STRING
    ) {
      analizador.agregarError(this.expr1.getSimbolo(), 'No se pueden comparar variables de diferente tipo');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    return { tipo: new TipoVar('boolean'), texto: `${res1.texto} ${this.com} ${res2.texto}` };
  }
}
