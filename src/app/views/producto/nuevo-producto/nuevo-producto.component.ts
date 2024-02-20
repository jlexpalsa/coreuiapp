import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [FormularioProductoComponent],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.scss'
})
export class NuevoProductoComponent {

  constructor(private _productoService: ProductoService,public activeModal: NgbActiveModal) {
 
  }
 
  guardarCambios(ent: Producto) {
   
    this._productoService.crearProducto(ent).subscribe(
      () => {  
        this.activeModal.close();                            
      },
      (error) =>console.error(error)
    );
  }
}
