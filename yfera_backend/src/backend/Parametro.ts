import { Simbolo } from './Simbolo';
import { TipoVar } from './TipoVar';

export class Parametro {
  private tipo: TipoVar;
  private nombre: Simbolo;
  constructor(tipo: TipoVar, nombre: Simbolo) {
    this.tipo = tipo;
    this.nombre = nombre;
  }

  public getTipo(): TipoVar {
    return this.tipo;
  }

  public getNombre(): Simbolo {
    return this.nombre;
  }
}
