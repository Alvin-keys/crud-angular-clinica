import { Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/cadastro/cadastro').then(m => m.CadastroComponent)
  },
  {
    path: 'consulta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/consulta/consulta').then(m => m.ConsultaComponent)
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    component: PacientesComponent
  },
  {
    path: 'pacientes/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/detalhe-paciente/detalhe-paciente').then(m => m.DetalhePacienteComponent)
  }
];