import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Producto } from '../producto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModule, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { TipoAccion } from 'src/app/utilidades/enums/acciones';
import { MostrarErroresComponent } from '../../../utilidades/components/mostrar-errores/mostrar-errores.component';
import { primeraLetraMayuscula } from 'src/app/utilidades/utilidades';
import { FormValidationService } from 'src/app/utilidades/service/form-validation.service';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { BodegaService } from '../../bodegas/services/bodega.service';

;


@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [RowComponent, ColComponent, FormModule, ReactiveFormsModule, CardModule, MostrarErroresComponent, ComboBoxModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.scss'
})
export class FormularioProductoComponent implements OnInit {

  public form!: FormGroup;
  public tituloFormulario: string = "";
  id = new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(99)] });
  name = new FormControl('', { validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()] });
  bodegaId = new FormControl('', { validators: [Validators.required] });
  public  localFields: Object = { text:'name', value:'bodegaId'};
  public selectedValue: number = 0;

  @Input() accion!: TipoAccion;
  @Input() modelo: any;
  @Input() isDisabled: boolean = false;
  @Input() errores: string[] = [];
  @Output() onSubmit: EventEmitter<Producto> = new EventEmitter<Producto>();

  

  public data: any[] = [];
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private _validationForm: FormValidationService, private _bodegaService: BodegaService) {
  }
  

  ngOnInit(): void {

    if (this.accion == TipoAccion.Create) {
      this.tituloFormulario = 'Nuevo ';
    }
    else if (this.accion == TipoAccion.Update) {
      this.tituloFormulario = 'Modificar ';
    }

    this.form = this.formBuilder.group({
      id: this.id,
      name: this.name,
      bodegaId:this.bodegaId,
    });
    this.form.get('id')?.enable();
    this.obtenerBodegas();
    if (this.modelo !== undefined) {
      console.log(this.modelo);
      this.form.patchValue(
        {

          id: this.modelo.id,
          name: this.modelo.name,
          bodegaId:this.modelo.bodegaId,
        }
      );
      this.form.get('id')?.disable();
    }
   
  }

  async obtenerBodegas() {
   await this._bodegaService.obtenerBodegas().subscribe(a => {
      this.data = a;
    });   
  }


  guardarCambios() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  obtenerError(campoNombre: string): string {
    const campo = this.form.get(campoNombre);
    return campo ? this._validationForm.obtenerMensajeError(campo) : '';
  }

  obtenerErrorCampoNombre() {
    var campo = this.form.get(['name']);

    if (campo === null) {
      return '*Este campo es requerido';
    }
    else {
      if (campo.hasError('required')) {
        return 'Este campo es requerido';
      }

      if (campo.hasError('minlength')) {
        return 'La longitud mínima es de 3 caracteres'
      }

      if (campo.hasError('primeraLetraMayuscula')) {
        return campo.getError('primeraLetraMayuscula').mensaje;
      }
    }
    return '';
  }

  obtenerErrorCampoId() {
    var campo = this.form.get(['id']);

    if (campo === null) {
      return '*Este campo es requerido';
    }
    else {
      if (campo.hasError('required')) {
        return 'Este campo es requerido';
      }

      if (campo.hasError('min')) {
        return 'El orden debe ser mayor a cero';
      }

      if (campo.hasError('max')) {
        return 'El orden debe ser menor a 100';
      }
    }
    return '';
  }


}
