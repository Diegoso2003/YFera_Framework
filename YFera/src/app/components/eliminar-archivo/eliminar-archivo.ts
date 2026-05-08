import { Component, inject, input, output } from '@angular/core';
import { EstructuraModel } from '../../models/EstructuraModel';
import { Boton } from "../boton/boton";
import { ArchivoService } from '../../services/archivo-service';
import { Informacion } from '../../services/informacion';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerMensajeError } from '../../class/MensajeError';

@Component({
  selector: 'app-eliminar-archivo',
  imports: [Boton],
  templateUrl: './eliminar-archivo.html',
  styleUrl: './eliminar-archivo.css',
})
export class EliminarArchivo {
  archivoNodo = input.required<EstructuraModel>();
  cerrar = output<void>();
  eliminado = output<void>();
  private _archivoS = inject(ArchivoService)
  private _info = inject(Informacion)

  eliminar(): void {
    this._archivoS.eliminarArchivo(this.archivoNodo().ruta).subscribe({
      next: () => {
        this.eliminado.emit();
      },
      error: (error: HttpErrorResponse) => {
        this._info.mostrarError(extraerMensajeError(error, 'error al eliminar el archivo intente más tarde'))
      }
    });
  }
}
