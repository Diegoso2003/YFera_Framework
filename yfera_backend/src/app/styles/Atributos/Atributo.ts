import { AnalizadorStyles } from '../AnalizadorStyles';
import { Expresion } from '../Expresiones/Expresion';
import { AtributoGeneral } from './AtributoGeneral';

export class Atributo extends AtributoGeneral {
  private valor: Expresion | string;
  constructor(atributo: string, valor: Expresion | string) {
    super(atributo);
    this.valor = valor;
  }

  analizar(analizador: AnalizadorStyles): string {
    if (typeof this.valor === 'string') {
      return this.valor;
    }
    const valorActual = this.valor.obtenerValor(analizador);
    if (!valorActual.getError()) {
      return valorActual.obtenerCompilado();
    }
    return 'error';
  }
}
