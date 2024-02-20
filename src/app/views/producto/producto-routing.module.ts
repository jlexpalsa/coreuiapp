import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductoComponent } from './listado-producto/listado-producto.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Producto'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado-productos'
      },
      {
        path: 'listado-productos',
        component: ListadoProductoComponent,
        data: {
          title: 'Listado Productos'
        }
      },
      // {
      //   path: 'modificar-productos',
      //   component: CrudProductoComponent,
      //   data: {
      //     title: 'Modificar Productos'
      //   }
      // },
      // {
      //   path: 'crear-productos',
      //   component: CrudProductoComponent,
      //   data: {
      //     title: 'Crear Productos'
      //   }
      // },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
