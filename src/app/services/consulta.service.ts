import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consulta {
  id?: number;
  dataConsulta: string;
  observacoes: string;
  paciente: {
    id: number;
    nome?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private api = 'http://localhost:8080/consultas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.api);
  }

  salvar(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.api, consulta);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

 buscarPorPaciente(pacienteId: number): Observable<Consulta[]> {
    return this.http.get<any[]>(`${this.api}/paciente/${pacienteId}`);
  }
}