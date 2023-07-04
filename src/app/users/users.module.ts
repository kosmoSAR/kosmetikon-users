import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UsersListComponent } from './components/users-list/users-list.component';
import { ButtonDialogComponent } from './components/button-dialog/button-dialog.component';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';

@NgModule({
  declarations: [
    UsersListComponent,
    ButtonDialogComponent,
    UsersTableComponent,
    ModalPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UsersTableComponent
  ]
})
export class UsersModule { }
