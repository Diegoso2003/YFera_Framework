import { Compilador } from '../../compiladores/Compilador';
import { CompiladorComponent } from '../../compiladores/CompiladorComponent';
import { Tipo } from '../../Tipo';
import { InputBase } from './InputBase';

export class InputBool extends InputBase {
  analizar(analizador: Compilador): string {
    let resultado = '<input type="checkbox"';
    resultado += ` \${${this.contenido.getValue().analizar(analizador, Tipo.BOOLEAN)} ? 'checked' : ''}`;
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
