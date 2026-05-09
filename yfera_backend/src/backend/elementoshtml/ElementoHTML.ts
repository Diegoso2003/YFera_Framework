import { NodoElemento } from '../Elementos/NodoElemento';

export abstract class ElementoHTML extends NodoElemento {
  protected estilos: string[];
  protected elementos: NodoElemento[];
  constructor(estilos: string[], elementos: NodoElemento[]) {
    super();
    this.estilos = estilos;
    this.elementos = elementos;
  }

  public getEstilos(): string[] {
    return this.estilos;
  }
  public setEstilos(value: string[]) {
    this.estilos = value;
  }

  public getElementos(): NodoElemento[] {
    return this.elementos;
  }
  public setElementos(value: NodoElemento[]) {
    this.elementos = value;
  }
}
