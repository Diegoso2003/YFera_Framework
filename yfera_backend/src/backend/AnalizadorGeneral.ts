import { CompiladorComponent } from './compiladores/CompiladorComponent';
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
      errores.añadirActual();
      return {
        nombre: nombre.replace('.styles', '.css'),
        contenido: this.obtenerClases(estilos, lista),
      };
    } else if (nombre.endsWith('.component')) {
      const componente = new CompiladorComponent();
      const compilado = componente.analizar(input);
      errores.añadirActual();
      return {
        nombre: nombre.replace('.component', '.js'),
        contenido: compilado,
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
      atributos.forEach((valor, atributo) => {
        contenido += `\n\t${atributo} ${valor}`;
      });
      contenido += '\n}\n';
    });
    return contenido;
  }
}
