import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'platos',
        loadComponent: () =>
          import('./pages/platos/platos.component').then(m => m.PlatosComponent)
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./pages/empleados/empleados.component').then(m => m.EmpleadosComponent)
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/pedidos/pedidos.component').then(m => m.PedidoComponent)
      },
      {
        path: 'mesas',
        loadComponent: () =>
          import('./pages/mesa/mesa.component').then(m => m.MesaComponent)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes.component').then(m => m.ClientesComponent)
      }
    ]
  }
];
