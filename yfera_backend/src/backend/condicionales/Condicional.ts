import { NodoElemento } from '../Elementos/NodoElemento';

export abstract class Condicional extends NodoElemento {
  protected elementos: NodoElemento[];
  constructor(elementos: NodoElemento[]) {
    super();
    this.elementos = elementos;
  }
}
