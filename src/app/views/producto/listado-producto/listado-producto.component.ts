import { Component, ViewChild } from '@angular/core';
import { CardModule, GridModule, TableModule, UtilitiesModule, ButtonModule, ButtonGroupComponent, ModalModule, FormModule, ToastModule } from '@coreui/angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { IconModule } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoProductoComponent } from '../nuevo-producto/nuevo-producto.component';
import Swal from 'sweetalert2';
import { ModificarProductoComponent } from '../modificar-producto/modificar-producto.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { TipoAccion } from '../../../shared/enums/acciones';


@Component({
  selector: 'app-listado-producto',
  standalone: true,
  imports: [GridModule, ButtonModule, ButtonGroupComponent, CardModule, TableModule, UtilitiesModule,
    DocsComponentsModule, RouterTestingModule, IconModule, ModalModule, FormModule, ReactiveFormsModule, DataTablesModule, ToastModule],
  templateUrl: './listado-producto.component.html',
  styleUrl: './listado-producto.component.scss'
})
export class ListadoProductoComponent {
  ProductosList: any[] = [];
  productForm: FormGroup;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  public dtInstance!: Promise<DataTables.Api>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public StateEnum = TipoAccion.Read;


  idProducto: number = 0;
  constructor(private fb: FormBuilder, private _productoService: ProductoService, private Router: Router, private modalService: NgbModal, private toastr: ToastrService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      Id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();

  }

  obtenerProductos() {
    this._productoService.obtenerProductos().subscribe(a => {
      this.ProductosList = a
    }
    );
    console.log(this.ProductosList);

  }

  nuevoProducto() {
    this.StateEnum = TipoAccion.Create;
    this.openFormModal();
  }
  modificarProducto(idProducto: number) {

    this.idProducto = idProducto;
    this.StateEnum = TipoAccion.Update;
    this.openFormModal();
  }

  openFormModal() {

    if (this.StateEnum == TipoAccion.Create) {
      const modalRef = this.modalService.open(NuevoProductoComponent);
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
      this._productoService.obtenerPorId(this.idProducto)
        .subscribe({
          next: this.handleUpdateResponse.bind(this),
          error: this.handleError.bind(this)
        });
    }

  };


  rerender(): void {
    console.log(this.dtElement)
    if (this.dtElement === undefined || this.dtElement.dtInstance === undefined) {
      this.obtenerProductos();
    }
    else {

      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // var table = $('#tblProductos').DataTable();
      // dtInstance.destroy();
      // this.obtenerProductos();
      // });
    };
  };

  handleError(error: any) {
    Swal.fire(error.error);
  }

  handleUpdateResponse(menu: any) {
    const modalRef = this.modalService.open(ModificarProductoComponent);
    modalRef.componentInstance.cciPadre = null;
    modalRef.componentInstance.modelo = menu;
    modalRef.result.then(
      () => {
        this.rerender();
      },
      () => {
      });
  }

  eliminarProducto(objeto: any,) {
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
        this._productoService.DeleteID(objeto.id).subscribe(resultado => {

          this.toastr.success('Datos eliminados correctamente.');
          // this.toastr.success('Hello world!', 'Toastr fun!');
          this.obtenerProductos();

        })

      }
    });

  }

}
