import { Compilador } from '../compiladores/Compilador';
import { Simbolo } from '../Simbolo';
import { Tipo } from '../Tipo';
import { TipoVar } from '../TipoVar';
import { ExpresionCompi } from './ExpresionCompi';

export class VariableArreglo extends ExpresionCompi {
  private nombre: string;
  private expr: ExpresionCompi;

  constructor(simbolo: Simbolo, nombre: string, expr: ExpresionCompi) {
    super(simbolo);
    this.simbolo = simbolo;
    this.nombre = nombre;
    this.expr = expr;
  }

  analizar(analizador: Compilador): { tipo: TipoVar; texto: string } {
    if (!analizador.getAceptaVariables()) {
      analizador.agregarError(this.simbolo, 'no se aceptan variables en este punto');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    const tipo = analizador.obtenerValor(this.simbolo);
    if (tipo.getTipo() === Tipo.ERROR) {
      return { tipo: tipo, texto: '' };
    }
    if (!tipo.getArreglo()) {
      tipo.setTipo(Tipo.ERROR);
      analizador.agregarError(this.simbolo, 'La variable no es un arreglo');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    const valorExpresion = this.expr.analizar(analizador);
    if (
      (valorExpresion.tipo.getTipo() !== Tipo.ERROR && valorExpresion.tipo.getTipo() !== Tipo.ENTERO) ||
      valorExpresion.tipo.getArreglo()
    ) {
      analizador.agregarError(this.simbolo, 'el indice solo puede ser un valor entero');
      return { tipo: new TipoVar('error'), texto: '' };
    }
    const texto = `${this.nombre.replace('$', '')}.obtenerValor(${valorExpresion.texto});`;
    tipo.setArreglo(false);
    return { tipo: tipo, texto: texto };
  }
}
