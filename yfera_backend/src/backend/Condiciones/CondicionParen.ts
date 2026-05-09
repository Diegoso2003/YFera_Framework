import { Compilador } from '../compiladores/Compilador';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';

export class CondicionParen extends ExpresionCompi {
  private condiciones: ExpresionCompi;
  private negar: boolean;

  constructor(condiciones: ExpresionCompi, negar: boolean = false) {
    super(condiciones.getSimbolo());
    this.condiciones = condiciones;
    this.negar = negar;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    const res1 = this.condiciones.analizar(analizador);
    if (res1.tipo.getTipo() === Tipo.ERROR) {
      return { tipo: new TipoVar('error'), texto: '' };
    }
    if (res1.tipo.getTipo() !== Tipo.BOOLEAN || res1.tipo.getArreglo()) {
      analizador.agregarError(
        this.condiciones.getSimbolo(),
        'solo variables tipo boolean son aceptadas como condiciones',
      );
      return { tipo: new TipoVar('error'), texto: '' };
    }
    return { tipo: res1.tipo, texto: `!(${res1.texto})` };
  }
}
