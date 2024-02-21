import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.status == 0) { //or whatever condition you like to put
    resultado.push('No hay comunicación con el servidor');
    return resultado;
  }


  if (response.error) {
    if (typeof response.error === 'string') {
      resultado.push(response.error);
    } else if (response && response.error && response.error.message) {
        resultado.push(response.error.message);
      
    }

    else {
      const mapaErrores = response.error.errors;
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {

        Object.keys(arreglo[1]).forEach(function (item) {
          resultado.push(arreglo[1][item]);
        });


      });
    }
  }

  return resultado;
};

export function formatearNumero(numero: number): string {
  // Utiliza toLocaleString para dar formato al número
  return numero.toLocaleString('en-US', { minimumFractionDigits: 2 });
}

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

      const valor = <string>control.value;
      if (!valor) return null;
      if (valor.length === 0) return null;

     
      const primeraLetra = valor[0];
      if (primeraLetra !== primeraLetra.toUpperCase()){
          return {
              primeraLetraMayuscula: {
              mensaje: 'La primera letra debe ser mayúscula'
          }
          };
      }
      else
      {
        return null;
      }
    };    
}


export function obtenerErrorCampo(form:FormGroup, campoName:string):String {
  var campo = form.get([campoName]);

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
    
    if (campo.hasError('min')){
      return 'El orden debe ser mayor a cero';
    }  

    if (campo.hasError('max')){
      return 'El orden debe ser menor a 100';
    }  
  }
  return '';
}

