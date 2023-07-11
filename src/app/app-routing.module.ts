import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './users/pages/inicio/inicio.component';
import { LoginGuardian } from './users/components/login/login-guardian';

const routes: Routes = [
  { path: 'login', component: InicioComponent},
  { path: 'dashboard', loadChildren: () => import('./users/users.module').then(res => res.UsersModule), canActivate:[LoginGuardian] },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
