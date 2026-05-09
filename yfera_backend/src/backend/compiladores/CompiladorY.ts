/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RegistroErrores } from '../RegistroErrores';
import { Compilador } from './Compilador';

export class CompiladorY extends Compilador {
  analizar(input: string): string {
    const errores = RegistroErrores.getInstance();
    try {
      const parser = require('../analizadores/principal.js');
      const resultado = parser.parse(input);
    } catch (error: any) {
      console.log(error);
      errores.agregarError({
        lexema: '',
        linea: 0,
        columna: 0,
        descripcion: 'El parser no se pudo recuperar',
        tipo: 'Fatal',
      });
    }
    return '';
  }
}
