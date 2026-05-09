/* eslint-disable @typescript-eslint/no-unused-vars */
import { Compilador } from '../compiladores/Compilador';
import { Simbolo } from '../Simbolo';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Literal extends ExpresionCompi {
  private valor: string;
  private tipo: Tipo;

  constructor(simbolo: Simbolo, valor: string, tipo: Tipo) {
    super(simbolo);
    this.valor = valor;
    this.tipo = tipo;
    this.simbolo = simbolo;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    return { tipo: new TipoVar(this.tipo), texto: this.valor };
  }
}
