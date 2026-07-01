export interface Cliente {
  id?: string;
  nome: string;
  dataPrimeiraConsulta: string;
  telefone: string;
  email: string;
  uf?: string;
  municipio?: string;
}