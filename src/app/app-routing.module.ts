import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './users/pages/inicio/inicio.component';
import { UsersTableComponent } from './users/pages/users-table/users-table.component';

const routes: Routes = [
  { path: 'login', component: InicioComponent},
  { path: 'dashboard', loadChildren: () => import('./users/users.module').then(res => res.UsersModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
