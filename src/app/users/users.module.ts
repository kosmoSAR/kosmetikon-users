import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UsersListComponent } from './pages/users-list/users-list.component';
import { ButtonDialogComponent } from './components/button-dialog/button-dialog.component';

@NgModule({
  declarations: [
    UsersListComponent,
    ButtonDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UsersListComponent,
    ButtonDialogComponent,
  ]
})
export class UsersModule { }
