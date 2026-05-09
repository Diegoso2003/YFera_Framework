import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { Label } from '../Inputs/Label';
import { Simbolo } from '../Simbolo';
import { Tipo } from '../Tipo';

export class Submit {
  private simbolo: Simbolo;
  private label: Label;
  private params: string[];
  private estilos: string[] = [];

  constructor(label: Label, simbolo: Simbolo, params: string[]) {
    this.label = label;
    this.simbolo = simbolo;
    this.params = params;
  }

  analizar(analizador: CompiladorComponent) {
    let resultado = `<button type="button" (onclick)="${analizador.getNombre() + analizador.getCantidadF()}"`;
    if (this.estilos.length > 0) {
      resultado += ' class="';
      this.estilos.forEach((clase) => {
        analizador.getClases().add(clase);
        resultado += clase + ' ';
      });
      resultado += '"';
    }
    resultado += `>${this.label.analizar(analizador, Tipo.STRING)}`;
    resultado += '</button>';
    return resultado;
  }

  public getSimbolo(): Simbolo {
    return this.simbolo;
  }
  public setSimbolo(value: Simbolo) {
    this.simbolo = value;
  }

  public getLabel(): Label {
    return this.label;
  }
  public setLabel(value: Label) {
    this.label = value;
  }

  public getParams(): string[] {
    return this.params;
  }
  public setParams(value: string[]) {
    this.params = value;
  }

  public getEstilos(): string[] {
    return this.estilos;
  }
  public setEstilos(value: string[]) {
    this.estilos = value;
  }
}
