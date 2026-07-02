import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api);
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, cliente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.api}/${id}`);
  }

  atualizar(cliente: Cliente) {
    return this.http.put<Cliente>(`${this.api}/${cliente.id}`, cliente);
  }

  getConsultasPorPaciente(id: number) {
  return this.http.get<any[]>(`http://localhost:8080/pacientes/${id}`);
}
}