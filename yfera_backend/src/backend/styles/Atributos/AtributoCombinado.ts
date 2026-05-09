import { AnalizadorStyles } from '../AnalizadorStyles';
import { AtributoGeneral } from './AtributoGeneral';
import { Combinado } from './Combinado';

export class AtributoCombinado extends AtributoGeneral {
  private combinado: Combinado;
  constructor(atributo: string, combinado: Combinado) {
    super(atributo);
    this.combinado = combinado;
  }

  analizar(analizador: AnalizadorStyles): string {
    let valor = '';
    const valor1 = this.combinado.getExpr().obtenerValor(analizador);
    if (!valor1.getError()) {
      valor += valor1.obtenerCompilado() + ' ';
    }
    const valor2 = this.combinado.getEstilo();
    valor += valor2 + ' ';
    const color = this.combinado.getColor().analizar(analizador);
    valor += color;
    return valor;
  }
}
