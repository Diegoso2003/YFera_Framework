import { Compilador } from '../compiladores/Compilador';
import { Simbolo } from '../Simbolo';
import { TipoVar } from '../TipoVar';

export abstract class ExpresionCompi {
  protected simbolo: Simbolo;
  constructor(simbolo: Simbolo) {
    this.simbolo = simbolo;
  }
  abstract analizar(analizador: Compilador): { tipo: TipoVar; texto: string };

  public getSimbolo(): Simbolo {
    return this.simbolo;
  }
}
