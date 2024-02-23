import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioFacturaComponent } from './formulario-factura/formulario-factura.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Facturas'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado'
      },
      {
        path: 'listado',
        component: FormularioFacturaComponent,
        data: {
          title: 'Facturas'
        }
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
