import { AtributoGeneral } from './AtributoGeneral';
import { Combinado } from './Combinado';

export class AtributoCombinado extends AtributoGeneral {
  private combinado: Combinado;
  constructor(atributo: string, combinado: Combinado) {
    super(atributo);
    this.combinado = combinado;
  }
}
