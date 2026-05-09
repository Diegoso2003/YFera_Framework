import { convertir, Tipo } from './Tipo';

export class TipoVar {
  private tipo: Tipo;
  private arreglo: boolean;

  constructor(tipo: string, arreglo: boolean = false) {
    this.arreglo = arreglo;
    this.tipo = convertir(tipo);
  }

  public getTipo(): Tipo {
    return this.tipo;
  }
  public setTipo(value: Tipo) {
    this.tipo = value;
  }

  public getArreglo(): boolean {
    return this.arreglo;
  }
  public setArreglo(value: boolean) {
    this.arreglo = value;
  }
}
