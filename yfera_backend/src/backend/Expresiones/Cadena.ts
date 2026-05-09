import { Compilador } from '../compiladores/Compilador';
import { Simbolo } from '../Simbolo';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Cadena extends ExpresionCompi {
  private cadenas: (string | ExpresionCompi)[];
  private tipo: Tipo = Tipo.STRING;
  constructor(simbolo: Simbolo, cadenas: (string | ExpresionCompi)[]) {
    super(simbolo);
    this.cadenas = cadenas;
    this.simbolo = simbolo;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    let texto = '`';
    this.cadenas.forEach((valor) => {
      if (typeof valor === 'string') {
        texto += valor;
      } else {
        texto += `\${${valor.analizar(analizador).texto}} texto`;
      }
    });
    texto += '`';
    return { tipo: new TipoVar('string'), texto: texto };
  }
}
