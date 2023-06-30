import { Component } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/users.interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const ELEMENT_DATA: Usuarios[] = [
  {isEdit: false, nombre: "Santiago", apellido: 'Aristizabal', fechaNacimiento: new Date(), email: 'jsanti@gmail.com', cargo: "junior", password: "1234"},
];

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  dataSource = ELEMENT_DATA;

  onEdit( item: Usuarios ){
    item.isEdit = !item.isEdit;
  }
}
