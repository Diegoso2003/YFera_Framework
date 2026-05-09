import { Compilador } from '../../compiladores/Compilador';
import { CompiladorComponent } from '../../compiladores/CompiladorComponent';
import { Tipo } from '../../Tipo';
import { InputBase } from './InputBase';

export class InputText extends InputBase {
  analizar(analizador: Compilador): string {
    let resultado = '<input type="text"';
    resultado += ` value="\${${this.contenido.getValue().analizar(analizador, Tipo.STRING)}}"`;
    resultado += ` id="\${${this.contenido.getId().analizar(analizador, Tipo.STRING)}}"`;
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
    return resultado;
  }
}
