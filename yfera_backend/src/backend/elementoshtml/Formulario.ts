import { Compilador } from '../compiladores/Compilador';
import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { NodoElemento } from '../Elementos/NodoElemento';
import { Submit } from '../Elementos/Submit';
import { ElementoHTML } from './ElementoHTML';

export class Formulario extends ElementoHTML {
  private submit?: Submit;
  constructor(estilos: string[], elementos: NodoElemento[], submit: Submit | undefined) {
    super(estilos, elementos);
    this.submit = submit;
  }

  analizar(analizador: Compilador): string {
    let resultado = '\n<form';
    const temp = analizador as CompiladorComponent;
    if (this.estilos.length > 0) {
      resultado += ' class="';
      this.estilos.forEach((clase) => {
        temp.getClases().add(clase);
        resultado += clase + ' ';
      });
      resultado += '"';
    }
    resultado += '>';
    this.elementos.forEach((elemento) => {
      resultado += '\n' + elemento.analizar(analizador);
    });
    resultado += this.submit?.analizar(temp) ?? '';
    resultado += '\n</form>';
    return resultado;
  }
}
