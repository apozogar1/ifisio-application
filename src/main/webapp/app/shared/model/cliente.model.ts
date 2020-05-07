import { Moment } from 'moment';
import { IMedicion } from 'app/shared/model/medicion.model';
import { INumDoc } from 'app/shared/model/num-doc.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  fechaNacimiento?: Moment;
  medicions?: IMedicion[];
  numDocs?: INumDoc[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidos?: string,
    public telefono?: string,
    public fechaNacimiento?: Moment,
    public medicions?: IMedicion[],
    public numDocs?: INumDoc[]
  ) {}
}
