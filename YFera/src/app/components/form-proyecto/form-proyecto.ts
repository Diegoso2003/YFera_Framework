import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Boton } from "../boton/boton";
import { Informacion } from '../../services/informacion';
import { ProyectoService } from '../../services/proyecto-service';
import { ProyectoModel } from '../../models/ProyectoModel';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerMensajeError } from '../../class/MensajeError';

@Component({
  selector: 'app-form-proyecto',
  imports: [ReactiveFormsModule, Boton],
  templateUrl: './form-proyecto.html',
  styleUrl: './form-proyecto.css',
})
export class FormProyecto {

  nuevaCarpeta = output<string>();

  proyectoForm: FormGroup;
  private _info = inject(Informacion)
  private _proyectos = inject(ProyectoService)

  constructor(private formBuilder: FormBuilder) {
    this.proyectoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
    });
  }

  enviar() {
    if(this.proyectoForm.valid){
      const nuevo: ProyectoModel = this.proyectoForm.value as ProyectoModel;
      this._proyectos.crearProyecto(nuevo).subscribe({
        next: (nuevo: ProyectoModel) => {
          this.nuevaCarpeta.emit(nuevo.nombre)
        },
        error: (error: HttpErrorResponse) => {
          this._info.mostrarError(extraerMensajeError(error, 'Error al crear el proyecto intente más tarde'))
        }
      })
      return
    }
    this._info.mostrarError('Ingrese un nombre valido')
  }
}
