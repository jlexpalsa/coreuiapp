import { Component } from '@angular/core';
import { FormularioBodegaComponent } from '../formulario-bodega/formulario-bodega.component';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { BodegaService } from '../services/bodega.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bodega } from '../Bodegas';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nueva-bodega',
  standalone: true,
  imports: [FormularioBodegaComponent],
  templateUrl: './nueva-bodega.component.html',
  styleUrl: './nueva-bodega.component.scss'
})
export class NuevaBodegaComponent {
  public StateEnum = TipoAccion.Create;
  errores: string[] = [];
  constructor(private _bodegaService: BodegaService,public activeModal: NgbActiveModal, private toastr: ToastrService) {
 
  }
 
  guardarCambios(ent: Bodega) {
   
    this._bodegaService.crearBodega(ent).subscribe(
      () => {  
        this.activeModal.close();  
        this.toastr.success('Datos creados correctamente.');                               
      },
      (error) => {
        console.log(error);
        this.errores = parsearErroresAPI(error)
      }
    );
  }

}
