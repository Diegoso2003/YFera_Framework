import { Compilador } from '../compiladores/Compilador';
import { ElementoFor } from '../Elementos/ElementoFor';
import { NodoElemento } from '../Elementos/NodoElemento';
import { Simbolo } from '../Simbolo';
import { ForSimple } from './ForSimple';

export class ForCompuesto extends ForSimple {
  private elemento: ElementoFor[];
  private simbolo: Simbolo;

  constructor(elemento: ElementoFor[], simbolo: Simbolo, elementos: NodoElemento[], elementosVacio: NodoElemento[]) {
    super(elementos, elementosVacio);
    this.elemento = elemento;
    this.simbolo = simbolo;
  }

  analizar(analizador: Compilador): string {
    return '';
  }
}
