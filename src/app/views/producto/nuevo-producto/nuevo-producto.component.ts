import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [FormularioProductoComponent],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.scss'
})
export class NuevoProductoComponent {

  public StateEnum = TipoAccion.Create;
  errores: string[] = [];
  constructor(private _productoService: ProductoService,public activeModal: NgbActiveModal) {
 
  }
 
  guardarCambios(ent: Producto) {
   
    this._productoService.crearProducto(ent).subscribe(
      () => {  
        this.activeModal.close();                            
      },
      (error) => {
        console.log(error);
        this.errores = parsearErroresAPI(error)
      }
    );
  }
}
