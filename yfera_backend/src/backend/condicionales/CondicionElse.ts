import { Compilador } from '../compiladores/Compilador';
import { Condicional } from './Condicional';

export class CondicionElse extends Condicional {
  analizar(analizador: Compilador): string {
    let resultado = '\n{';
    resultado += 'resultado += `';
    analizador.setComponente(true);
    this.elementos.forEach((elemento) => {
      resultado += elemento.analizar(analizador);
    });
    if (analizador.getComponente()) {
      resultado += '`;';
    }
    resultado += '}';
    resultado += 'resultado += `';
    analizador.setComponente(true);
    return resultado;
  }
}
