import { Compilador } from '../compiladores/Compilador';

export abstract class NodoElemento {
  abstract analizar(analizador: Compilador): string;
}
