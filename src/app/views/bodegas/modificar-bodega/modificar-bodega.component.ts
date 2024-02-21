import { Component } from '@angular/core';
import { FormularioBodegaComponent } from '../formulario-bodega/formulario-bodega.component';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { ProductoService } from '../../producto/producto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BodegaService } from '../services/bodega.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-bodega',
  standalone: true,
  imports: [FormularioBodegaComponent],
  templateUrl: './modificar-bodega.component.html',
  styleUrl: './modificar-bodega.component.scss'
})
export class ModificarBodegaComponent {
  modelo: any;
  public StateEnum = TipoAccion.Update;
  errores: string[] = [];

  constructor(private _bodegasService: BodegaService, public activeModal: NgbActiveModal, private toastr: ToastrService
  ) {}


  guardarCambios(bodega: any) {
 
    this._bodegasService.actualizarBodegas(this.modelo.id, bodega).subscribe(
      () => {  
        this.activeModal.close();
        this.toastr.success('Datos actualizados correctamente.');                            
      },
      (error) => console.log(error)
    );
   
  }
}
