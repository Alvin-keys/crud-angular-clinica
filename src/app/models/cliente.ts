export interface Cliente {
  id?: number;
  nome: string;
  dataPrimeiraConsulta: string;
  telefone: string;
  email: string;
  uf?: string;
  municipio?: string;

  idade?: number;
  queixaPrincipal?: string;
  composicaoFamiliar?: string;
  rotina?: string;
  contatoEmergencia?: string;
  diasAtendimento?: string;
  horarioAtendimento?: string;
}