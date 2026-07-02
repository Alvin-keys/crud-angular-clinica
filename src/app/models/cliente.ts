export interface Cliente {
  id?: number;
  nome: string;
  dataPrimeiraConsulta: string;
  telefone: string;
  email: string;
  uf?: string;
  municipio?: string;
}