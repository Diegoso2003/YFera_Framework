import { MensajeError } from './MensajeError';

export interface ArchivoErrores {
  ruta: string;
  errores: MensajeError[];
}
