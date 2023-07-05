import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios} from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { modalUsers } from '../button-dialog/button-dialog.component';
import { HttpStatusCode } from '@angular/common/http';
import { ModalPasswordComponent } from '../modal-password/modal-password.component';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})

export class UsersListComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  public userInfo!: Usuarios;
  public userList!: Usuarios[];
  public dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private _userService: UsersService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogDelete: MatDialog){
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this._userService.getUserList().subscribe({
      next: ( resp: any ) => {
        this.userList = resp.data;
        this.dataSource = new MatTableDataSource( this.userList )
        this.dataSource.paginator = this.paginator;
      },
      error: ( error: string ) => {
        console.log(error);
      }
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar( user: Usuarios ): void{
      this.dialogDelete.open(ModalPasswordComponent, {
        data: { EMAIL: user.EMAIL, NOMBRE: user.NOMBRE},
      });
  }

  openDialog(user: Usuarios, event: string) {
    this.dialog.open(modalUsers, {
      data: {user , event}
    });
  }

}
