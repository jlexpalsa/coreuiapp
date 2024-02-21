import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_MESSAGES} from '../validation-messages';

@Injectable({
	providedIn: 'root'
})
export class FormValidationService {

	constructor() { }

  obtenerMensajeError(campo: AbstractControl): string {
    if (!campo) return '*Este campo es requerido';
 
    for (const errorKey in campo.errors) {
      if (campo.hasError(errorKey)) {
        let mensaje = VALIDATION_MESSAGES[errorKey]; // Obtiene el mensaje base usando la clave del error
 
        const errorParams = campo.getError(errorKey);
        if (errorParams) {
          // Itera a través de los parámetros del error para reemplazar los placeholders en el mensaje
          Object.keys(errorParams).forEach(param => {
            // Reemplaza el placeholder con el valor actual. Asegúrate de convertir todo a string.
            mensaje = mensaje.replace(`{${param}}`, errorParams[param].toString());
          });
        }
 
        return mensaje; // Devuelve el mensaje de error ya procesado
      }
    }
    return '';
  }
}
