import { ICliente } from 'app/shared/model/cliente.model';

export interface ICompanya {
  id?: number;
  nombre?: string;
  precioSesion?: number;
  clientes?: ICliente[];
}

export class Companya implements ICompanya {
  constructor(public id?: number, public nombre?: string, public precioSesion?: number, public clientes?: ICliente[]) {}
}
