import { Compilador } from '../compiladores/Compilador';
import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { ElementoHTML } from './ElementoHTML';

export class Imagen extends ElementoHTML {
  private urls: ExpresionCompi[];
  constructor(estilo: string[], urls: ExpresionCompi[]) {
    super(estilo, []);
    this.urls = urls;
  }

  analizar(analizador: Compilador): string {
    let clases = '';
    if (this.estilos.length > 0) {
      const temp = analizador as CompiladorComponent;
      clases += ' class="';
      this.estilos.forEach((clase) => {
        temp.getClases().add(clase);
        clases += clase + ' ';
      });
      clases += '"';
    }
    return this.agregarImagenes(analizador, clases);
  }

  agregarImagenes(analizador: Compilador, clases: string): string {
    if (this.urls.length === 1) {
      const resultado = this.urls[0].analizar(analizador);
      if (resultado.tipo.getTipo() !== Tipo.STRING && resultado.tipo.getTipo() !== Tipo.ERROR) {
        analizador.agregarError(this.urls[0].getSimbolo(), 'el componente imagen solo acepta strings como parametros');
      }
      return `<img ${clases} src="\${${resultado.texto}}" alt="error">`;
    } else {
      let resultado = '<div class="carousel">\n<div class="slides" id="slides">';
      this.urls.forEach((url) => {
        const expr = url.analizar(analizador);
        if (expr.tipo.getTipo() !== Tipo.STRING && expr.tipo.getTipo() !== Tipo.ERROR) {
          analizador.agregarError(url.getSimbolo(), 'el componente imagen solo acepta strings como parametros');
        }
        resultado += `<img ${clases} src="\${${expr.texto}}" alt="error">`;
      });
      resultado += '</div>\n</div>';
      return resultado;
    }
  }
}
