import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ListadoProductoComponent } from './listado-producto/listado-producto.component';


@NgModule({
  declarations: [
    

  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    
  ]
})
export class ProductoModule { }
