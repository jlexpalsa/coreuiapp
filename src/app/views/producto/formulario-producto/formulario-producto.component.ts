import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Producto } from '../producto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModule, ColComponent, FormModule, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [RowComponent, ColComponent, FormModule, ReactiveFormsModule, CardModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.scss'
})
export class FormularioProductoComponent implements OnInit {

  public form!: FormGroup;
  public tituloFormulario: string = "";

  @Input() accion: string = "";
  @Input() modelo: any;
  @Input() isDisabled: boolean = false;

  @Output() onSubmit: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    if (this.accion == "nuevo") { 
      this.tituloFormulario = 'Nuevo '; 
    }
    else if (this.accion == "modificar") { 
      this.tituloFormulario = 'Modificar '; 
    }

    this.form = this.formBuilder.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
    });
    this.form.get('id')?.enable();

    if (this.modelo !== undefined) {
      this.form.patchValue(
        {
          
          id: this.modelo.id,
          name: this.modelo.name,
        }
      );
      this.form.get('id')?.disable();
    }
  }


  guardarCambios() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }



}
