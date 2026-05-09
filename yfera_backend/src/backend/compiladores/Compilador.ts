import { RegistroErrores } from '../RegistroErrores';
import { Simbolo } from '../Simbolo';
import { TipoVar } from '../TipoVar';

export abstract class Compilador {
  protected tabla: Map<string, TipoVar> = new Map();
  protected errores = RegistroErrores.getInstance();
  protected aceptaVariables: boolean = true;
  protected contadorCiclos: number = 0;
  protected componente: boolean = false;
  abstract analizar(input: string): string;

  public agregarError(simbolo: Simbolo, mensaje: string) {
    this.errores.agregarSimbolo(simbolo, mensaje);
  }

  public agregar(simbolo: Simbolo, tipo: TipoVar): void {
    if (this.tabla.has(simbolo.getLexema())) {
      this.errores.agregarSimbolo(simbolo, 'la variable ya ha sido declarada');
      return;
    }
    this.tabla.set(simbolo.getLexema(), tipo);
  }

  public remover(nombre: string): void {
    this.tabla.delete(nombre);
  }

  public obtenerValor(simbolo: Simbolo): TipoVar {
    const temp = simbolo.getLexema().replace('$', '');
    if (this.tabla.has(temp)) {
      return this.tabla.get(temp)!;
    }
    this.errores.agregarSimbolo(simbolo, 'Variable no declarada');
    return new TipoVar('error');
  }

  public getAceptaVariables(): boolean {
    return this.aceptaVariables;
  }
  public setAceptaVariables(value: boolean) {
    this.aceptaVariables = value;
  }

  public entrarEnCiclo() {
    this.contadorCiclos++;
  }

  public salirDeCiclo() {
    this.contadorCiclos--;
  }

  public dentroDeCiclo(): boolean {
    return this.contadorCiclos > 0;
  }

  public getComponente(): boolean {
    return this.componente;
  }
  public setComponente(value: boolean) {
    this.componente = value;
  }
}
