import { Compilador } from '../compiladores/Compilador';
import { CompiladorComponent } from '../compiladores/CompiladorComponent';
import { NodoElemento } from '../Elementos/NodoElemento';
import { ExpresionCompi } from '../Expresiones/ExpresionCompi';
import { Tipo } from '../Tipo';
import { Condicional } from './Condicional';

export class CondicionalIf extends Condicional {
  private condicion: ExpresionCompi;
  private alternativa?: Condicional;
  constructor(condicion: ExpresionCompi, elementos: NodoElemento[], alternativa: Condicional | undefined) {
    super(elementos);
    this.condicion = condicion;
    this.alternativa = alternativa;
  }
  analizar(analizador: Compilador): string {
    let resultado = '';
    if (analizador.getComponente()) {
      resultado += '`;';
      analizador.setComponente(false);
    }
    resultado += '\nif (';
    const valor = this.condicion.analizar(analizador);
    if (valor.tipo.getTipo() !== Tipo.BOOLEAN && valor.tipo.getTipo() !== Tipo.ERROR) {
      analizador.agregarError(this.condicion.getSimbolo(), 'solo se aceptan valores booleanos como condiciones');
    }
    resultado += valor.texto;
    resultado += '){';
    resultado += 'resultado += `';
    analizador.setComponente(true);
    this.elementos.forEach((elemento) => {
      resultado += elemento.analizar(analizador);
    });
    if (analizador.getComponente()) {
      resultado += '`;';
      analizador.setComponente(false);
    }
    resultado += '} ';
    if (this.alternativa) {
      resultado += ' else ';
      resultado += this.alternativa.analizar(analizador);
    }
    return resultado;
  }
}
