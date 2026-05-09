import { RegistroErrores } from '../RegistroErrores';
import { AnalizadorStyles } from './AnalizadorStyles';
import { NodoEstilo } from './NodoEstilo';

export class CicloFor extends NodoEstilo {
  private variable: string;
  private inicio: number;
  private ultimo: number;
  private inclusivo: boolean;
  private nodos: NodoEstilo[];
  constructor(variable: string, inicio: string, inclusivo: boolean, ultimo: string, nodos: NodoEstilo[]) {
    super();
    this.variable = variable;
    this.inicio = Number(inicio);
    this.inclusivo = inclusivo;
    this.ultimo = Number(ultimo);
    this.nodos = nodos;
  }

  analizar(analizador: AnalizadorStyles): void {
    analizador.setUsoVariables(true);
    analizador.setVariableActual(this.variable);
    const errores = RegistroErrores.getInstance();
    const cantidad = errores.erroresActual();
    if (this.inclusivo) {
      for (let i = this.inicio; i <= this.ultimo; i++) {
        analizador.setValorActual(i);
        this.nodos.forEach((nodo) => {
          nodo.analizar(analizador);
        });
        if (cantidad !== errores.erroresActual()) {
          break;
        }
      }
    } else {
      for (let i = this.inicio; i < this.ultimo; i++) {
        analizador.setValorActual(i);
        this.nodos.forEach((nodo) => {
          nodo.analizar(analizador);
        });
        if (cantidad !== errores.erroresActual()) {
          break;
        }
      }
    }
    analizador.setUsoVariables(false);
  }
}
