import { ICita } from 'app/shared/model/cita.model';
import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface ITratamientoCliente {
  id?: number;
  numSesiones?: number;
  diagnostico?: string;
  precioSesion?: number;
  expediente?: string;
  citas?: ICita[];
  tratamiento?: ITratamiento;
  cliente?: ICliente;
}

export class TratamientoCliente implements ITratamientoCliente {
  constructor(
    public id?: number,
    public numSesiones?: number,
    public numSesionesDisfrutadas?: number,
    public diagnostico?: string,
    public precioSesion?: number,
    public expediente?: string,
    public citas?: ICita[],
    public tratamiento?: ITratamiento,
    public cliente?: ICliente
  ) {}
}
