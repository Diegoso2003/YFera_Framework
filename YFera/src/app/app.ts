import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InformacionC } from "./components/informacion-c/informacion-c";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InformacionC],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('YFera');
}
