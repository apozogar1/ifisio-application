import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IMedicion {
  id?: number;
  peso?: number;
  altura?: number;
  fechaMedicion?: Moment;
  cliente?: ICliente;
}

export class Medicion implements IMedicion {
  constructor(public id?: number, public peso?: number, public altura?: number, public fechaMedicion?: Moment, public cliente?: ICliente) {}
}
