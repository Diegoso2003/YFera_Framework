import { RegistroErrores } from '../../RegistroErrores';
import { Simbolo } from '../../Simbolo';
import { AnalizadorStyles } from '../AnalizadorStyles';
import { Expresion } from './Expresion';
import { Numero } from './Numero';

export class Variable extends Expresion {
  private variable: string;
  constructor(simbolo: Simbolo, variable: string) {
    super(simbolo);
    this.variable = variable;
  }
  obtenerValor(analizador: AnalizadorStyles): Expresion {
    const errores = RegistroErrores.getInstance();
    if (!analizador.getUsoVariables()) {
      errores.agregarSimbolo(this.simbolo, 'Variable no declarada');
      return new Numero(this.simbolo, '12', true);
    }
    if (analizador.getVariableActual() !== this.variable) {
      errores.agregarSimbolo(this.simbolo, 'Variable no declarada');
      return new Numero(this.simbolo, '12', true);
    }
    return new Numero(this.simbolo, analizador.getValorActual().toString());
  }
  obtenerCompilado(): string {
    return '';
  }
}
