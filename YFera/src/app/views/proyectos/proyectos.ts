import { Component, inject, OnInit, signal } from '@angular/core';
import { ProyectoService } from '../../services/proyecto-service';
import { FormProyecto } from "../../components/form-proyecto/form-proyecto";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-proyectos',
  imports: [FormProyecto, RouterLink],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos implements OnInit{
  proyectos = signal<string[]>([])
  cargando = signal<boolean>(true)
  private _proyectoService = inject(ProyectoService);

  ngOnInit(): void {
    this._proyectoService.obtenerProyectos().subscribe({
      next: (proyectos: string[]) => {
        this.cargando.set(false);
        this.proyectos.set(proyectos);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  actualizarNuevoProyecto(nuevo: string): void {
    this.proyectos().push(nuevo);
  }
}
