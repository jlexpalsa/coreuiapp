import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoBodegasComponent } from './listado-bodegas/listado-bodegas.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bodega'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado-bodegas'
      },
      {
        path: 'listado-bodegas',
        component: ListadoBodegasComponent,
        data: {
          title: 'Listado Bodegas'
        }
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegasRoutingModule { }
