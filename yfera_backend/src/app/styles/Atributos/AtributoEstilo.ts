import { AtributoGeneral } from './AtributoGeneral';

export class AtributoEstilo extends AtributoGeneral {
  private estilo: string;
  constructor(atributo: string, estilo: string) {
    super(atributo);
    this.estilo = estilo;
  }
}
