import { Expresion } from '../Expresiones/Expresion';
import { AtributoGeneral } from './AtributoGeneral';

export class Atributo extends AtributoGeneral {
  private valor: Expresion | string;
  constructor(atributo: string, valor: Expresion | string) {
    super(atributo);
    this.valor = valor;
  }
}
