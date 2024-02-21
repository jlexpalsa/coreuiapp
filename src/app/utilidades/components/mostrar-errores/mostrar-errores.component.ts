import { Component, Input } from '@angular/core';
import { AlertComponent } from '@coreui/angular';

@Component({
  selector: 'app-mostrar-errores',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './mostrar-errores.component.html',
  styleUrl: './mostrar-errores.component.scss'
})
export class MostrarErroresComponent {
  @Input() errores: string[] = [];
 
  constructor() {
 
  }
 
  ngOnInit(): void {
   }
 
}
