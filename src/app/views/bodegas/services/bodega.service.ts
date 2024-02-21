import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private apiUrl = `${environment.apiUrl}/Bodegas`;

  constructor(private http: HttpClient) { }

  obtenerBodegas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  crearBodega(Bodegas: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Bodegas);
  }
  actualizarBodegas(codigo: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${codigo}`, productData);
  }

  DeleteID(id : number):Observable<any>{
    const purl= `${this.apiUrl}/${id}`;
    return this.http.delete(purl)
  }

  public obtenerPorId(id?: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
