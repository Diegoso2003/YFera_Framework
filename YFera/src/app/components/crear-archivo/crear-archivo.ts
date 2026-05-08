import { Component, inject, input, output } from '@angular/core';
import { EstructuraModel } from '../../models/EstructuraModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Informacion } from '../../services/informacion';
import { Boton } from "../boton/boton";
import { ArchivoCrearModel } from '../../models/ArchivoCrearModel';
import { ArchivoService } from '../../services/archivo-service';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerMensajeError } from '../../class/MensajeError';

@Component({
  selector: 'app-crear-archivo',
  imports: [ReactiveFormsModule, Boton],
  templateUrl: './crear-archivo.html',
  styleUrl: './crear-archivo.css',
})
export class CrearArchivo {
  padre = input.required<EstructuraModel>();
  cerrar = output<void>();
  creado = output<void>();
  formulario: FormGroup;
  private _info = inject(Informacion)
  private _archivoS = inject(ArchivoService)

  constructor(private fb: FormBuilder){
    this.formulario = fb.group({
      nombre: ['', Validators.required],
      tipo: ['CARPETA', Validators.required]
    });
  }

  crear() {
    if(this.formulario.valid){
      const nuevo = this.formulario.value as ArchivoCrearModel;
      nuevo.carpeta = this.padre().ruta
      this._archivoS.crearArchivo(nuevo).subscribe({
        next: () => {
          this.creado.emit();
        },
        error: (error: HttpErrorResponse) => {
          this._info.mostrarError(extraerMensajeError(error, 'error al crear archivo intente más tarde'))
        }
      })
    } else {
      this._info.mostrarError('Ingrese correctamente los datos solicitados')
    }
  }
}
