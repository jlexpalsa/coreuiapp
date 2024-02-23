import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}`;


  constructor(private http: HttpClient) { }

  obtenerclientes(): Observable<any> {
    return this.http.get(this.apiUrl+"/Clientes");
  }
  crearBodega(Bodegas: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Bodegas);
  }
  actualizarBodegas(codigo: number, bodegaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${codigo}`, bodegaData);
  }

  DeleteID(id : number):Observable<any>{
    const purl= `${this.apiUrl}/${id}`;
    return this.http.delete(purl)
  }

  public obtenerPorId(id?: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
