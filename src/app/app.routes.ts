import { Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/cadastro/cadastro').then(m => m.CadastroComponent)
  },
  {
    path: 'consulta',
    loadComponent: () =>
      import('./pages/consulta/consulta').then(m => m.ConsultaComponent)
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: 'pacientes/:id',
    loadComponent: () =>
      import('./pages/detalhe-paciente/detalhe-paciente').then(m => m.DetalhePacienteComponent)
  }
];