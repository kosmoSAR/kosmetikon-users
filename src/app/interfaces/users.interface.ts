export interface Usuarios{
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  email: string;
  cargo: string;
  password: string;
}

export interface UsuariosEdit{
  isEdit: boolean;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  email: string;
  cargo: string;
  password: string;
}
