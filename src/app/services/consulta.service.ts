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

  private api = 'https://clinica-tanandra-api.onrender.com/consultas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.api, { withCredentials: true });
  }

  salvar(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.api, consulta, { withCredentials: true });
  }

  atualizar(consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.api}/${consulta.id}`, consulta, { withCredentials: true });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, { withCredentials: true });
  }

  buscarPorPaciente(pacienteId: number): Observable<Consulta[]> {
    return this.http.get<any[]>(`${this.api}/paciente/${pacienteId}`, { withCredentials: true });
  }
}