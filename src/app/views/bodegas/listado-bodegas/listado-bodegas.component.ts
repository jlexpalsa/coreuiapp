import { Component, ViewChild } from '@angular/core';
import { CardModule, GridModule, TableModule, UtilitiesModule, ButtonModule, ButtonGroupComponent, ModalModule, FormModule, ToastModule } from '@coreui/angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { RouterTestingModule } from '@angular/router/testing';


import { IconModule } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { DataTableDirective, DataTablesModule } from 'angular-datatables';


import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { BodegaService } from '../services/bodega.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevaBodegaComponent } from '../nueva-bodega/nueva-bodega.component';
import { ModificarBodegaComponent } from '../modificar-bodega/modificar-bodega.component';

@Component({
  selector: 'app-listado-bodegas',
  standalone: true,
    imports: [CommonModule, GridModule, ButtonModule, ButtonGroupComponent, CardModule, TableModule, UtilitiesModule,
    DocsComponentsModule, RouterTestingModule, IconModule, ModalModule, FormModule, ReactiveFormsModule, DataTablesModule, ToastModule,
    NgxPaginationModule,NgbPagination],
  templateUrl: './listado-bodegas.component.html',
  styleUrl: './listado-bodegas.component.scss'
})
export class ListadoBodegasComponent {
  BodegasList: any[] = [];
  bodegaForm: FormGroup;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  public dtInstance!: Promise<DataTables.Api>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public StateEnum = TipoAccion.Read;
  public pageSize:number =10;
  public page:number =0;



  idBodega: number = 0;
  constructor(private fb: FormBuilder, private _bodegaService: BodegaService, private Router: Router, 
    private modalService: NgbModal, private toastr: ToastrService) {
    this.bodegaForm = this.fb.group({
      name: ['', Validators.required],
      Id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerBodegas();

  }

  obtenerBodegas() {
    this._bodegaService.obtenerBodegas().subscribe(a => {
      this.BodegasList = a
      this.page = a.length;
    }
    );
   

  }

  nuevaBodega() {
    this.StateEnum = TipoAccion.Create;
    this.openFormModal();
  }
  modificarBodega(idBodega: number) {

    this.idBodega = idBodega;
    this.StateEnum = TipoAccion.Update;
    this.openFormModal();
  }

  openFormModal() {

    if (this.StateEnum == TipoAccion.Create) {
      const modalRef = this.modalService.open(NuevaBodegaComponent);
      modalRef.componentInstance.cciPadre = null;
      modalRef.result.then(
        () => {
          console.log("creado correctamente");

          this.rerender();
        },
        () => {
        });
    }
    else if (this.StateEnum == TipoAccion.Update) {
      this._bodegaService.obtenerPorId(this.idBodega)
        .subscribe({
          next: this.handleUpdateResponse.bind(this),
          error: this.handleError.bind(this)
        });
    }

  };


  rerender(): void {
    console.log(this.dtElement)
    if (this.dtElement === undefined || this.dtElement.dtInstance === undefined) {
      this.obtenerBodegas();
    }
    else {

      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // var table = $('#tblBodegas').DataTable();
      // dtInstance.destroy();
      // this.obtenerBodegas();
      // });
    };
  };

  handleError(error: any) {
    Swal.fire(error.error);
  }

  handleUpdateResponse(menu: any) {
    const modalRef = this.modalService.open(ModificarBodegaComponent);
    modalRef.componentInstance.cciPadre = null;
    modalRef.componentInstance.modelo = menu;
    modalRef.result.then(
      () => {
        this.rerender();
      },
      () => {
      });
  }

  eliminarBodega(objeto: any,) {
    let mensaje = "Seguro quiere eliminar el registro : " + objeto.name
    Swal.fire({
      title: "Estas seguro?",
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._bodegaService.DeleteID(objeto.id).subscribe(resultado => {

          this.toastr.success('Datos eliminados correctamente.');
          // this.toastr.success('Hello world!', 'Toastr fun!');
          this.obtenerBodegas();

        })

      }
    });

  }
}
