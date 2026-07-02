import { Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pacientes',
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
  },
  {
  path: 'pacientes',
  component: PacientesComponent
}
];