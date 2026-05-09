import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { NodoElemento } from '../Elementos/NodoElemento';
import { Parametro } from '../Parametro';
import { Simbolo } from '../Simbolo';

export class Componente {
  private nombre: Simbolo;
  private parametros: Parametro[];
  private elementos: NodoElemento[];

  constructor(nombre: Simbolo, parametros: Parametro[], elementos: NodoElemento[]) {
    this.nombre = nombre;
    this.parametros = parametros;
    this.elementos = elementos;
  }

  public analizar(analizador: CompiladorComponent): string {
    analizador.setNombre(this.nombre.getLexema());
    let compilado = `export function ${this.nombre.getLexema()} (`;
    const nombresp: string[] = [];
    this.parametros.forEach((parametro) => {
      analizador.agregar(parametro.getNombre(), parametro.getTipo());
      nombresp.push(parametro.getNombre().getLexema());
    });
    compilado += nombresp.join(', ');
    compilado += '){\n';
    compilado += 'try {';
    compilado += 'let resultado = `';
    analizador.setComponente(true);
    this.elementos.forEach((elemento) => {
      compilado += '\n' + elemento.analizar(analizador);
    });
    if (analizador.getComponente()) {
      compilado += '`;';
    }
    compilado += `\nreturn resultado;
  }catch(error) {
      alert(error.message);
      return '';
  }
  }`;
    return compilado;
  }
}
