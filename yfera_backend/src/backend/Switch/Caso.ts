import { Compilador } from '../compiladores/Compilador';
import { NodoElemento } from '../Elementos/NodoElemento';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { CasoBase } from './CasoBase';

export class Caso extends CasoBase {
  private expr: ExpresionCompi;
  private elementos: NodoElemento[];
  private agregarBreak: boolean;
  constructor(expr: ExpresionCompi, elementos: NodoElemento[], agregar: boolean = false) {
    super();
    this.expr = expr;
    this.elementos = elementos;
    this.agregarBreak = agregar;
  }

  analizar(analizador: Compilador, tipo: Tipo): string {
    analizador.setAceptaVariables(false);
    const res = this.expr.analizar(analizador);
    if (res.tipo.getTipo() !== Tipo.ERROR && res.tipo.getTipo() !== tipo) {
      analizador.agregarError(this.expr.getSimbolo(), 'se esperaba una variable tipo ' + tipo);
    }
    let resultado = `\ncase ${res.texto}:`;
    analizador.setAceptaVariables(true);
    if (analizador.getComponente()) {
      resultado += '\nresultado += `';
    }
    this.elementos.forEach((elemento) => {
      resultado += elemento.analizar(analizador);
    });
    if (analizador.getComponente()) {
      resultado += '`;';
    }
    if (this.agregarBreak) {
      resultado += 'break;';
    }
    return resultado;
  }
}
