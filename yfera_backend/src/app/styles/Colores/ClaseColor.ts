import { AnalizadorStyles } from '../AnalizadorStyles';

export abstract class ClaseColor {
  abstract analizar(analizador: AnalizadorStyles): string;
}
