import { RegistroErrores } from '../RegistroErrores';
import { AnalizadorStyles } from './AnalizadorStyles';
import { AtributoGeneral } from './Atributos/AtributoGeneral';
import { NodoEstilo } from './NodoEstilo';
import { NombreClase } from './NombreClase';

export class Clase extends NodoEstilo {
  private nombre: NombreClase;
  private atributos: AtributoGeneral[];
  private compilado: Map<string, string> = new Map();
  constructor(nombre: NombreClase, atributos: AtributoGeneral[]) {
    super();
    this.nombre = nombre;
    this.atributos = atributos;
  }

  analizar(analizador: AnalizadorStyles): void {
    this.compilado = new Map();
    const errores = RegistroErrores.getInstance();
    if (this.nombre.getVariable() && !analizador.getUsoVariables()) {
      errores.agregarSimbolo(this.nombre.getSimbolo(), 'nombre de clase no valido, variable no declarada');
    }
    let nombreClase = '';
    if (this.nombre.getVariable()) {
      if (!this.nombre.getNombre().includes(analizador.getVariableActual())) {
        errores.agregarSimbolo(this.nombre.getSimbolo(), 'nombre de clase no valido, variable no declarada');
      }
      nombreClase = this.nombre
        .getNombre()
        .replace(analizador.getVariableActual(), analizador.getValorActual().toString());
    } else {
      nombreClase = this.nombre.getNombre();
    }
    analizador.agregarClase(nombreClase, this.compilado, this);
    this.añadirHeredado(analizador);
    this.atributos.forEach((atributo) => {
      const compilado = atributo.analizar(analizador) + ';';
      this.compilado.set(atributo.getAtributo(), compilado);
    });
  }

  añadirHeredado(analizador: AnalizadorStyles) {
    const errores = RegistroErrores.getInstance();
    if (this.nombre.getPadre()) {
      const clase = analizador.getClases().get(this.nombre.getPadre()!.getNombre());
      if (!clase) {
        errores.agregarSimbolo(
          this.nombre.getSimbolo(),
          `no se encontro la clase padre '${this.nombre.getPadre()!.getNombre()}'`,
        );
      } else {
        clase.forEach((compilado, estilo) => {
          this.compilado.set(estilo, compilado);
        });
      }
    }
  }

  public getNombre(): NombreClase {
    return this.nombre;
  }

  public getCompilado(): Map<string, string> {
    return this.compilado;
  }
}
