import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Operacion extends ExpresionCompi {
  private expr1: ExpresionCompi;
  private valor: string;
  private expr2: ExpresionCompi;

  constructor(expr1: ExpresionCompi, valor: string, expr2: ExpresionCompi) {
    super(expr1.getSimbolo());
    this.expr1 = expr1;
    this.valor = valor;
    this.expr2 = expr2;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const resultado1 = this.expr1.analizar(analizador);
    const resultado2 = this.expr2.analizar(analizador);
    if (resultado1.tipo.getTipo() === Tipo.ERROR || resultado2.tipo.getTipo() === Tipo.ERROR) {
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (
      (resultado1.tipo.getTipo() === Tipo.STRING || resultado2.tipo.getTipo() === Tipo.STRING) &&
      this.valor === '+'
    ) {
      return { tipo: new TipoVar('string'), texto: `${resultado1.texto} ${this.valor} ${resultado2.texto}` };
    }
    const tipo1Invalido = resultado1.tipo.getTipo() !== Tipo.ENTERO && resultado1.tipo.getTipo() !== Tipo.FLOAT;
    const tipo2Invalido = resultado2.tipo.getTipo() !== Tipo.ENTERO && resultado2.tipo.getTipo() !== Tipo.FLOAT;
    if (tipo1Invalido || tipo2Invalido) {
      if (tipo1Invalido) {
        analizador.agregarError(this.expr1.getSimbolo(), 'operacion aritmetica solo es valida para enteros y floats.');
      } else {
        analizador.agregarError(this.expr1.getSimbolo(), 'operacion aritmetica solo es valida para enteros y floats.');
      }
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (resultado1.tipo.getTipo() === Tipo.FLOAT || resultado2.tipo.getTipo() === Tipo.FLOAT || this.valor === '/') {
      return { tipo: new TipoVar('float'), texto: `${resultado1.texto} ${this.valor} ${resultado2.texto}` };
    }
    return { tipo: new TipoVar('int'), texto: `${resultado1.texto} ${this.valor} ${resultado2.texto}` };
  }
}
