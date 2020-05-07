import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

export interface ITratamiento {
  id?: number;
  nombre?: string;
  numSesiones?: number;
  tratamientoClientes?: ITratamientoCliente[];
}

export class Tratamiento implements ITratamiento {
  constructor(
    public id?: number,
    public nombre?: string,
    public numSesiones?: number,
    public tratamientoClientes?: ITratamientoCliente[]
  ) {}
}
