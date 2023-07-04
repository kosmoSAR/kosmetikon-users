import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios} from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { modalUsers } from '../button-dialog/button-dialog.component';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];
  dataSource = new MatTableDataSource(this._userService.ELEMENT_DATA);

  public userInfo!: Usuarios;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private _userService: UsersService, private _snackBar: MatSnackBar, public dialog: MatDialog){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  openDialog(user: Usuarios, event: string) {
    this.dialog.open(modalUsers, {
      data: {user , event}
    });
  }

}
