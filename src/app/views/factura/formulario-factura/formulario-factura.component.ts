import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { MostrarErroresComponent } from 'src/app/utilidades/components/mostrar-errores/mostrar-errores.component';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { primeraLetraMayuscula } from 'src/app/utilidades/utilidades';
import { Factura, FacturaDetalle } from '../factura';
import { IconModule } from '@coreui/icons-angular';
import { MenuItemModel, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { Column, ColumnMenuService, ColumnModel, CommandColumnService, CommandModel, EditService, EditSettingsModel, FilterService, FilterSettingsModel, ForeignKeyService, GridComponent, GridModule, GroupService, GroupSettingsModel, PageService, ResizeService, SortService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { ProductoService } from '../../producto/producto.service';

@Component({
  selector: 'app-formulario-factura',
  standalone: true,
  imports: [RowComponent, ColComponent, FormModule, ReactiveFormsModule, CardModule, MostrarErroresComponent,
    ButtonModule, IconModule, MenuModule, GridModule, ComboBoxModule ],
  providers: [SortService, ResizeService, GroupService, ColumnMenuService, PageService, EditService, CommandColumnService, FilterService, ToolbarService,
    ForeignKeyService],
  templateUrl: './formulario-factura.component.html',
  styleUrl: './formulario-factura.component.scss'
})
export class FormularioFacturaComponent {
  public form!: FormGroup;
  public tituloFormulario: string = "";
  public pageSettings: any = null;
  facturaId = new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(99)] });
  observacion = new FormControl('', { validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()] });
  fecha = new FormControl('', { validators: [Validators.required,] });
  facturatotal = new FormControl('', { validators: [Validators.required,] });
  clienteId = new FormControl('', { validators: [Validators.required,] });
  public productColumns!: ColumnModel[];
  countries: { [key: string]: Object }[] = [];
  editParams: Object = {};
  public groupOptions: GroupSettingsModel;
  public filterSettings: FilterSettingsModel;
  @ViewChild('gridDetail') public gridDetalle:any;
  data: FacturaDetalle[] = []

  public menuItems: MenuItemModel[] = [];
  public editOptions: EditSettingsModel;
  public toolbarItems: ToolbarItems[];
  public orderidrules: Object = {};
  public productosList: Object[];
  public  localFields: Object = { text:'name', value:'bodegaId'};




  @Input() accion!: TipoAccion;
  @Input() modelo: any;
  @Input() isDisabled: boolean = false;
  @Input() errores: string[] = [];
  @Output() onSubmit: EventEmitter<Factura> = new EventEmitter<Factura>();

  constructor(private formBuilder: FormBuilder, private _productoService: ProductoService) {
  
    this.productColumns = [
      {
        field: 'productoId',
        headerText: 'Código',
        // format: 'yMd',
        width: 130,
        textAlign: 'Left',
        minWidth: 10
      },
      {
        field: 'productoName',
        headerText: 'Descripción',
        width: 120,
        format: 'C1',
        textAlign: 'Left',
        minWidth: 10
      }
    ];
    this.menuItems = [
      {
        text: 'File',
        iconCss: 'em-icons e-file',
        items: [
          { text: 'Open', iconCss: 'em-icons e-open' },
          { text: 'Save', iconCss: 'e-icons e-save' },
          { separator: true },
          { text: 'Exit' }
        ]
      },
      { text: 'Consultar', },
      { text: 'Agregar' },
      { text: 'Modificar' },
      { text: 'Eliminar' },
      { text: 'Cancelar' }
    ]

    this.groupOptions = { showGroupedColumn: true };
    this.filterSettings = { type: 'CheckBox' };

    this.editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
    this.toolbarItems = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.orderidrules = { required: true };
    this.productosList = [];
    this.data =[];
    // Calcular la suma y agregarla como una nueva propiedad "sum" durante la inicialización
    
   

  }

  ngOnInit(): void {
    this.obtenerProductos();
      
    this.pageSettings = { pageCount: 5 };
    if (this.accion == TipoAccion.Create) {
      this.tituloFormulario = 'Nuevo ';
    }
    else if (this.accion == TipoAccion.Update) {
      this.tituloFormulario = 'Modificar ';
    }

    this.form = this.formBuilder.group({
      facturaId: this.facturaId,
      observacion: this.observacion,
      fecha: this.fecha,
      facturatotal: this.facturatotal,
      clienteId: this.clienteId
    });
    this.form.get('id')?.enable();

    if (this.modelo !== undefined) {
      this.form.patchValue(
        {
          bodegaId: this.modelo.bodegaId,
          name: this.modelo.name,
        }
      );
      this.form.get('bodegaId')?.disable();
    }
  }
  async obtenerProductos() {
    await this._productoService.obtenerProductos().subscribe(a => {
      this.productosList = a
      console.log(a)
    });
    console.log(this.productosList)
  }

  // Método que se ejecuta después de completar una acción de edición
  actionComplete(args: any): void {
    if (args.requestType === 'save') { // Verificar si se guardó una edición
      console.log("Suma")
      this.getTotal(); // Actualizar la suma
    }
  }

  // Método para recalcular la suma
  getTotal(): void {
    this.data.forEach(item => {
      item.total = item.precio * item.cantidad;
    });
    const column: Column = this.gridDetalle.getColumnByField('gridDetalle');
    this.gridDetalle.refreshColumns([column.uid]); 

  }
}
