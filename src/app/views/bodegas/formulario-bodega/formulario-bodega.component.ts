import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoAccion } from '../../../utilidades/enums/acciones';


import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { primeraLetraMayuscula } from '../../../utilidades/utilidades';
import { CardModule, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { MostrarErroresComponent } from 'src/app/utilidades/components/mostrar-errores/mostrar-errores.component';
import { FormValidationService } from '../../../utilidades/service/form-validation.service';
import { Bodega } from '../bodegas';

@Component({
  selector: 'app-formulario-bodega',
  standalone: true,
  imports: [RowComponent, ColComponent, FormModule, ReactiveFormsModule, CardModule, MostrarErroresComponent],
  templateUrl: './formulario-bodega.component.html',
  styleUrl: './formulario-bodega.component.scss'
})
export class FormularioBodegaComponent {
  public form!: FormGroup;
  public tituloFormulario: string = "";

  @Input() accion!: TipoAccion;
  @Input() modelo: any;
  @Input() isDisabled: boolean = false;
  @Input() errores: string[] = [];
  @Output() onSubmit: EventEmitter<Bodega> = new EventEmitter<Bodega>();

  bodegaId = new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(99)] });
  name = new FormControl('', { validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()] });

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private _validationForm: FormValidationService ) {
  }

  ngOnInit(): void {

    if (this.accion == TipoAccion.Create) {
      this.tituloFormulario = 'Nuevo ';
    }
    else if (this.accion == TipoAccion.Update) {
      this.tituloFormulario = 'Modificar ';
    }

    this.form = this.formBuilder.group({
      bodegaId: this.bodegaId,
      name: this.name,
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


  guardarCambios() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  obtenerError(campoNombre: string): string {
   
    const campo = this.form.get(campoNombre);

    if (campo && campo.touched) {
      return this._validationForm.obtenerMensajeError(campo);
    }

    return '';
  }

}
