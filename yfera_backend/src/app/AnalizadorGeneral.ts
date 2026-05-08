import { RegistroErrores } from './RegistroErrores';
import { ResultadoArchivo } from './ResultadoArchivo';
import { AnalizadorStyles } from './styles/AnalizadorStyles';

export class AnalizadorGeneral {
  private clasescss: Map<string, Set<string>> = new Map();

  public analizar(nombre: string, ruta: string, input: string): ResultadoArchivo {
    const errores = RegistroErrores.getInstance();
    errores.iniciarAnalisis(ruta);
    if (nombre.endsWith('.styles')) {
      const estilos = new AnalizadorStyles();
      const lista = new Set<string>();
      this.clasescss.set(ruta, lista);
      estilos.analizar(input);
      return {
        nombre: nombre.replace('.styles', '.css'),
        contenido: this.obtenerClases(estilos, lista),
      };
    }
    return {
      nombre: nombre,
      contenido: input,
    };
  }

  private obtenerClases(estilos: AnalizadorStyles, lista: Set<string>): string {
    let contenido = '';
    estilos.getClases().forEach((atributos, nombre) => {
      lista.add(nombre);
      contenido += `.${nombre} {`;
      atributos.getCompilado().forEach((valor, atributo) => {
        contenido += `\n\t${atributo} ${valor}`;
      });
      contenido += '}';
    });
    return contenido;
  }
}
