import { Compilador } from '../compiladores/Compilador';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Incremento extends ExpresionCompi {
  private valor: string;
  private variable: ExpresionCompi;
  private alFinal: boolean;
  constructor(valor: string, variable: ExpresionCompi, alFinal: boolean = false) {
    super(variable.getSimbolo());
    this.valor = valor;
    this.variable = variable;
    this.alFinal = alFinal;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const resultado = this.variable.analizar(analizador);
    const tipo = resultado.tipo.getTipo();
    if (tipo !== Tipo.ENTERO && tipo !== Tipo.FLOAT && tipo !== Tipo.ERROR) {
      return { tipo: new TipoVar('error'), texto: '' };
    }
    let texto = '';
    if (this.alFinal) texto = `${resultado.texto} ${this.valor}`;
    else texto = `${this.valor} ${resultado.texto}`;
    return { tipo: resultado.tipo, texto: texto };
  }
}
