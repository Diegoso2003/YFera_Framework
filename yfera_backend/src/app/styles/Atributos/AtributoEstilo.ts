/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnalizadorStyles } from '../AnalizadorStyles';
import { AtributoGeneral } from './AtributoGeneral';

export class AtributoEstilo extends AtributoGeneral {
  private estilo: string;
  constructor(atributo: string, estilo: string) {
    super(atributo);
    this.estilo = estilo;
  }

  analizar(analizador: AnalizadorStyles): string {
    return this.estilo;
  }
}
