import { Compilador } from '../compiladores/Compilador';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';

export class CondicionS extends ExpresionCompi {
  private expr1: ExpresionCompi;
  private expr2: ExpresionCompi;
  private valor: string;

  constructor(expr1: ExpresionCompi, valor: string, expr2: ExpresionCompi) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.valor = valor;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const res1 = this.expr1.analizar(analizador);
    const res2 = this.expr2.analizar(analizador);
    if (res1.tipo.getTipo() === Tipo.ERROR || res2.tipo.getTipo() === Tipo.ERROR) {
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (res1.tipo.getTipo() !== Tipo.BOOLEAN || res1.tipo.getArreglo()) {
      analizador.agregarError(this.expr1.getSimbolo(), 'solo variables tipo boolean son aceptadas como condiciones');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (res2.tipo.getTipo() !== Tipo.BOOLEAN || res1.tipo.getArreglo()) {
      analizador.agregarError(this.expr2.getSimbolo(), 'solo variables tipo boolean son aceptadas como condiciones');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    return { tipo: res1.tipo, texto: `${res1.texto} ${this.valor} ${res2.texto}` };
  }
}
