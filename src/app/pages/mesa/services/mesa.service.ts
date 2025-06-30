import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Mesa {
  id?: number;
  numero: number;
  capacidad: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private apiUrl = `${environment.apiUrl}/mesas`;

  constructor(private http: HttpClient) {}

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  agregarMesa(mesa: Mesa): Observable<Mesa> {
    return this.http.post<Mesa>(this.apiUrl, mesa);
  }

  actualizarMesa(id: number, mesa: Mesa): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.apiUrl}/${id}`, mesa);
  }

  eliminarMesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
