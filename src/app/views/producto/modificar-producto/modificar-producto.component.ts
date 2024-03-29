import { Component } from '@angular/core';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { ProductoService } from '../producto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';

@Component({
  selector: 'app-modificar-producto',
  standalone: true,
  imports: [FormularioProductoComponent],
  templateUrl: './modificar-producto.component.html',
  styleUrl: './modificar-producto.component.scss'
})
export class ModificarProductoComponent {


  modelo: any;
  public StateEnum = TipoAccion.Update;
  errores: string[] = [];

  constructor(private _productoService: ProductoService, public activeModal: NgbActiveModal
  ) {}


  guardarCambios(producto: any) {
 console.log(producto)
    this._productoService.actualizarProducto(this.modelo.id, producto).subscribe(
      () => {  
        this.activeModal.close();                            
      },
      (error) => console.log(error)
    );
   
  }
}
