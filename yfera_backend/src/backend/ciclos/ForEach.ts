import { Compilador } from '../compiladores/Compilador';
import { ElementoFor } from '../Elementos/ElementoFor';
import { NodoElemento } from '../Elementos/NodoElemento';
import { ForSimple } from './ForSimple';

export class ForEach extends ForSimple {
  private elemento: ElementoFor;

  constructor(elemento: ElementoFor, elementos: NodoElemento[], elementosVacio: NodoElemento[]) {
    super(elementos, elementosVacio);
    this.elemento = elemento;
  }

  analizar(analizador: Compilador): string {
    return '';
  }
}
