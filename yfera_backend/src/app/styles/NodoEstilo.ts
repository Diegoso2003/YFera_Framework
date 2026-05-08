import { AnalizadorStyles } from './AnalizadorStyles';

export abstract class NodoEstilo {
  abstract analizar(analizador: AnalizadorStyles): void;
}
