import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuarios} from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];
  dataSource = this._userService.data_editar;

  public isEdit: boolean = false;
  public listUsers: any;

  constructor( private _userService: UsersService, private _snackBar: MatSnackBar){
  }

  ngOnInit(): void {
    this.agregarPropiedadUsuarios("isEdit", false);
  }

  public userInfo!: Usuarios;

  agregarPropiedadUsuarios(propiedad: string, valor: boolean): void {
    this._userService.data_editar.forEach(usuario => {
      usuario[propiedad] = valor;
    });
  }

  onEdit( user: any ){
    user.isEdit = !user.isEdit;
  }

  sendInfo( user: any ){
    user.isEdit = !user.isEdit;

    this.userInfo = {
      nombre: user.nombre,
      apellido: user.apellido,
      fechaNacimiento: user.fechaNacimiento,
      email: user.email,
      cargo: user.cargo,
      password: user.password
    };

    console.log(this.userInfo);
    // this._userService.updateUser( this.userInfo );
    this.editSnackBar();
  }

  eliminar( user: Usuarios ){

    this.userInfo = {
      nombre: user.nombre,
      apellido: user.apellido,
      fechaNacimiento: user.fechaNacimiento,
      email: user.email,
      cargo: user.cargo,
      password: user.password
    };

    console.log(this.userInfo);

    // this._userService.deleteUser(user);
    this.deleteSnackBar();
  }

  deleteSnackBar() {
    this._snackBar.open("Has eliminado el usuario", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  editSnackBar() {
    this._snackBar.open("Has realizado cambios satisfactoriamente", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
