import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
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
  }
];