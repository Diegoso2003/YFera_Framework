import { Compilador } from '../compiladores/Compilador';
import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { ElementoHTML } from './ElementoHTML';

export class Texto extends ElementoHTML {
  private expr: ExpresionCompi;
  constructor(estilo: string[], expr: ExpresionCompi) {
    super(estilo, []);
    this.expr = expr;
  }
  analizar(analizador: Compilador): string {
    let resultado = '<span';
    if (this.estilos.length > 0) {
      const temp = analizador as CompiladorComponent;
      resultado += ' class="';
      this.estilos.forEach((clase) => {
        temp.getClases().add(clase);
        resultado += clase + ' ';
      });
      resultado += '"';
    }
    resultado += '>';
    const resultado2 = this.expr.analizar(analizador);
    if (resultado2.tipo.getTipo() !== Tipo.STRING) {
      analizador.agregarError(this.expr.getSimbolo(), 'el componente texto solo soporta strings');
    }
    resultado += `\${${resultado2.texto}}`;
    resultado += '</span>';
    return resultado;
  }
}
