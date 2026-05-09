import { Compilador } from '../compiladores/Compilador';
import { NodoElemento } from '../Elementos/NodoElemento';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { CasoBase } from './CasoBase';

export class ESwitch extends NodoElemento {
  private expr3: ExpresionCompi;
  private casos: CasoBase[];
  constructor(expr: ExpresionCompi, casos: CasoBase[]) {
    super();
    this.expr3 = expr;
    this.casos = casos;
  }

  analizar(analizador: Compilador): string {
    let res = '';
    const resultado = this.expr3.analizar(analizador);
    if (resultado.tipo.getTipo() === Tipo.ERROR) {
      return '';
    }
    if (resultado.tipo.getTipo() !== Tipo.STRING && resultado.tipo.getTipo() !== Tipo.ENTERO) {
      analizador.agregarError(this.expr3.getSimbolo(), 'switch solo soporto variables tipo entero y string');
      return '';
    }
    if (analizador.getComponente()) {
      res = '`;';
      analizador.setComponente(false);
    }
    res = `\nswitch(${resultado.texto}){`;
    this.casos.forEach((caso) => {
      res += caso.analizar(analizador, resultado.tipo.getTipo());
    });
    res = '\n}';
    res = 'resultado += `';
    analizador.setComponente(true);
    return res;
  }
}
