import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path:"", component: UsersComponent, children: [
    { path: "", component: UsersTableComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
