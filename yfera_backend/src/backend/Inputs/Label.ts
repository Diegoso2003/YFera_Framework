import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';
import { ValorInput } from './ValorInput';

export class Label extends ValorInput {
  analizar(compilador: Compilador, tipo: Tipo): string {
    const resultado = this.expr.analizar(compilador);
    if (resultado.tipo.getTipo() !== tipo && resultado.tipo.getTipo() !== Tipo.ERROR) {
      compilador.agregarError(this.expr.getSimbolo(), 'label solo soporta strings');
    }
    return resultado.texto;
  }
}
