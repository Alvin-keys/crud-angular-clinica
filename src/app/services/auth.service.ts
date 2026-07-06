import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StatusLogin {
  autenticado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<any> {
    return this.http.post(`${this.api}/login`, { usuario, senha }, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.api}/logout`, {}, { withCredentials: true });
  }

  status(): Observable<StatusLogin> {
    return this.http.get<StatusLogin>(`${this.api}/status`, { withCredentials: true });
  }
}