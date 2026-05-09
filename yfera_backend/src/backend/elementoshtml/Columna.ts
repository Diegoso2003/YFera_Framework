import { Compilador } from '../compiladores/Compilador';
import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { ElementoHTML } from './ElementoHTML';

export class Columna extends ElementoHTML {
  analizar(analizador: Compilador): string {
    let resultado = '<tr';
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
    this.elementos.forEach((elemento) => {
      resultado += elemento.analizar(analizador);
    });
    resultado += '</tr>';
    return resultado;
  }
}
