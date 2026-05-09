import { Compilador } from '../compiladores/Compilador';
import { Simbolo } from '../Simbolo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class Variable extends ExpresionCompi {
  private nombre: string;

  constructor(simbolo: Simbolo, nombre: string) {
    super(simbolo);
    this.simbolo = simbolo;
    this.nombre = nombre;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    if (!analizador.getAceptaVariables()) {
      analizador.agregarError(this.simbolo, 'no se aceptan variables en este punto');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    const tipo = analizador.obtenerValor(this.simbolo);
    return { tipo: tipo, texto: this.nombre.replace('$', '') };
  }
}
