import { Moment } from 'moment';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { ICompanya } from 'app/shared/model/companya.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface INumDoc {
  id?: number;
  numDoc?: number;
  fechaAlta?: Moment;
  tratamientoClientes?: ITratamientoCliente[];
  companya?: ICompanya;
  cliente?: ICliente;
}

export class NumDoc implements INumDoc {
  constructor(
    public id?: number,
    public numDoc?: number,
    public fechaAlta?: Moment,
    public tratamientoClientes?: ITratamientoCliente[],
    public companya?: ICompanya,
    public cliente?: ICliente
  ) {}
}
