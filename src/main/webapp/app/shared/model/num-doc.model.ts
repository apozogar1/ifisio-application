import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { ICompanya } from 'app/shared/model/companya.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface INumDoc {
  id?: number;
  companyia?: string;
  numDoc?: number;
  tratamientoClientes?: ITratamientoCliente[];
  companya?: ICompanya;
  cliente?: ICliente;
}

export class NumDoc implements INumDoc {
  constructor(
    public id?: number,
    public companyia?: string,
    public numDoc?: number,
    public tratamientoClientes?: ITratamientoCliente[],
    public companya?: ICompanya,
    public cliente?: ICliente
  ) {}
}
