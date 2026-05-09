import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';

export abstract class CasoBase {
  abstract analizar(analizador: Compilador, tipo: Tipo): string;
}
