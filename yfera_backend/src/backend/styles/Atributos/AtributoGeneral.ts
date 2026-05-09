import { AnalizadorStyles } from '../AnalizadorStyles';

export abstract class AtributoGeneral {
  protected atributo: string;
  constructor(atributo: string) {
    this.atributo = atributo;
  }

  abstract analizar(analizador: AnalizadorStyles): string;

  public getAtributo(): string {
    return this.atributo;
  }
}
