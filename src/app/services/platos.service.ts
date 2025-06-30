// src/app/pages/platos/services/platos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Plato {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private apiUrl = environment.apiUrl + '/platos';

  constructor(private http: HttpClient) {}

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  agregarPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato);
  }

  actualizarPlato(id: number, plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${id}`, plato);
  }

  eliminarPlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
