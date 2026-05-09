import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';
import { ValorInput } from './ValorInput';

export class Value extends ValorInput {
  analizar(compilador: Compilador, tipo: Tipo): string {
    const resultado = this.expr.analizar(compilador);
    if (resultado.tipo.getTipo() !== tipo && resultado.tipo.getTipo() !== Tipo.ERROR) {
      compilador.agregarError(this.expr.getSimbolo(), 'se esperaba un valor de tipo ' + tipo);
    }
    return resultado.texto;
  }
}
