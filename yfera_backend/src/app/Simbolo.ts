export class Simbolo {
  private linea: number;
  private columna: number;
  private lexema: string;

  constructor(linea: number, columna: number, lexema: string) {
    this.linea = linea;
    this.columna = columna;
    this.lexema = lexema;
  }

  public getLinea(): number {
    return this.linea;
  }

  public getColumna(): number {
    return this.columna;
  }

  public getLexema(): string {
    return this.lexema;
  }
}
