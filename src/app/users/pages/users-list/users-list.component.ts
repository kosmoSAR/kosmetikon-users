import { Component } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

const ELEMENT_DATA: Usuarios[] = [
  {isEdit: false, nombre: "Santiago", apellido: 'Aristizabal', fechaNacimiento: "12/26", email: 'jsanti@gmail.com', cargo: "junior", password: "1234"},
  {isEdit: false, nombre: "Santiago", apellido: 'Aristizabal', fechaNacimiento: "12/26", email: 'jsanti@gmail.com', cargo: "junior", password: "1234"},
];

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];
  dataSource = ELEMENT_DATA;

  constructor( private _userService: UsersService ){}

  public userInfo!: Usuarios;

  onEdit( user: Usuarios ){
    user.isEdit = !user.isEdit;
    this.userInfo = user;
    console.log(this.userInfo);
  }

  sendInfo( user: Usuarios ){
    user.isEdit = !user.isEdit;
    this.userInfo = user;
    console.log(this.userInfo);
    this._userService.updateUser( this.userInfo );
  }

  eliminar( user: Usuarios ){
    console.log(user);
    this._userService.deleteUser(user)
  }

}
