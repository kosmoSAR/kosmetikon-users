import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios, UsuariosEdit} from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];
  dataSource = new MatTableDataSource(this._userService.data_editar);

  public userInfo!: Usuarios;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.agregarPropiedadUsuarios("isEdit", false);
  }

  constructor( private _userService: UsersService, private _snackBar: MatSnackBar){}

  agregarPropiedadUsuarios(propiedad: string, valor: boolean): void {
    this._userService.data_editar.forEach(usuario => {
      usuario[propiedad] = valor;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit( user: UsuariosEdit ){
    user.isEdit = !user.isEdit;
  }

  sendInfo( user: UsuariosEdit ){
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

  eliminar( user: UsuariosEdit ){

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
