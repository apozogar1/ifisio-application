import { Moment } from 'moment';
import { IMedicion } from 'app/shared/model/medicion.model';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { ICompanya } from 'app/shared/model/companya.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  fechaNacimiento?: Moment;
  medicions?: IMedicion[];
  tratamientoClientes?: ITratamientoCliente[];
  companya?: ICompanya;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidos?: string,
    public telefono?: string,
    public fechaNacimiento?: Moment,
    public medicions?: IMedicion[],
    public tratamientoClientes?: ITratamientoCliente[],
    public companya?: ICompanya
  ) {}
}
