import { NodoElemento } from '../Elementos/NodoElemento';

export abstract class ForSimple extends NodoElemento {
  private elementos: NodoElemento[];
  private elementosVacio: NodoElemento[];
  constructor(elementos: NodoElemento[], elementosVacio: NodoElemento[]) {
    super();
    this.elementos = elementos;
    this.elementosVacio = elementosVacio;
  }
}
