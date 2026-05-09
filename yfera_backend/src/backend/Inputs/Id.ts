import { Compilador } from '../compiladores/Compilador';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Simbolo } from '../Simbolo';
import { Tipo } from '../Tipo';
import { ValorInput } from './ValorInput';

export class Id extends ValorInput {
  private simbolo: Simbolo;
  constructor(simbolo: Simbolo, expr: ExpresionCompi) {
    super(expr);
    this.simbolo = simbolo;
  }

  analizar(compilador: Compilador, tipo: Tipo): string {
    const resultado = this.expr.analizar(compilador);
    if (resultado.tipo.getTipo() !== tipo && resultado.tipo.getTipo() !== Tipo.ERROR) {
      compilador.agregarError(this.simbolo, 'id solo soporto valores de string');
    }
    return resultado.texto;
  }
}
