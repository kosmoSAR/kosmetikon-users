import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UsersListComponent } from './components/users-list/users-list.component';
import { ButtonDialogComponent } from './components/button-dialog/button-dialog.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersTableComponent,
    ButtonDialogComponent,
    ModalPasswordComponent,
    InicioComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
  ],
  exports: [
    UsersTableComponent,
    InicioComponent
  ]
})
export class UsersModule { }
