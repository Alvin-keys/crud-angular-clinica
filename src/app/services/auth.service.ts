import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface StatusLogin {
  autenticado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://clinica-tanandra-api.onrender.com/auth';
  private chaveToken = 'clinica_token';

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.api}/login`, { usuario, senha }).pipe(
      tap(res => localStorage.setItem(this.chaveToken, res.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.chaveToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.chaveToken);
  }

  estaLogado(): boolean {
    return !!this.getToken();
  }

  status(): Observable<StatusLogin> {
    return this.http.get<StatusLogin>(`${this.api}/status`);
  }
}