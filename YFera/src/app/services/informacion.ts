import { Injectable, signal } from '@angular/core';
import { ArchivoErrores } from '../models/ArchivoErrores';

@Injectable({
  providedIn: 'root',
})
export class Informacion {
  mensaje = signal<string>('');
  mostrar = signal<boolean>(false);
  mostrarTabla = signal<boolean>(false);
  errores = signal<ArchivoErrores[]>([]);

  mostrarErrorCompilacion(errores: ArchivoErrores[]) {
    this.errores.set(errores);
    this.mostrarTabla.set(true);
  }

  ocultarTabla() {
    this.mostrarTabla.set(false);
  }

  mostrarError(mensaje: string) {
    this.mensaje.set(mensaje);
    this.mostrar.set(true);
  }

  ocultarError() {
    this.mostrar.set(false);
  }
}
