import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }
}
