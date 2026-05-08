import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Informacion {
  mensaje = signal<string>('')
  mostrar = signal<boolean>(false)

  mostrarError(mensaje: string) {
    this.mensaje.set(mensaje);
    this.mostrar.set(true);
  }
  
  ocultarError(){
    this.mostrar.set(false)
  }

}
