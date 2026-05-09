import { Compilador } from '../compiladores/Compilador';
import { NodoElemento } from '../Elementos/NodoElemento';
import { Tipo } from '../Tipo';
import { CasoBase } from './CasoBase';

export class Default extends CasoBase {
  private elementos: NodoElemento[];
  private agregarBreak: boolean;
  constructor(elementos: NodoElemento[], agregar: boolean = false) {
    super();
    this.elementos = elementos;
    this.agregarBreak = agregar;
  }

  analizar(analizador: Compilador, tipo: Tipo): string {
    let resultado = 'default:';
    analizador.setAceptaVariables(true);
    resultado += 'resultado += `';
    analizador.setComponente(true);
    this.elementos.forEach((elemento) => {
      resultado += elemento.analizar(analizador);
    });
    if (analizador.getComponente()) {
      resultado += '`;';
      analizador.setComponente(false);
    }
    return resultado;
  }
}
