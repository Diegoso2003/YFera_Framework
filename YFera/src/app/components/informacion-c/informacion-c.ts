import { Component, inject } from '@angular/core';
import { Informacion } from '../../services/informacion';

@Component({
  selector: 'app-informacion-c',
  imports: [],
  templateUrl: './informacion-c.html',
  styleUrl: './informacion-c.css',
})
export class InformacionC {
  _info = inject(Informacion)
}
