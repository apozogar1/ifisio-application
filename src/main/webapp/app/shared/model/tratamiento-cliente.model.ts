import { ICita } from 'app/shared/model/cita.model';
import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { INumDoc } from 'app/shared/model/num-doc.model';

export interface ITratamientoCliente {
  id?: number;
  numSesiones?: number;
  diagnostico?: string;
  citas?: ICita[];
  tratamiento?: ITratamiento;
  numDoc?: INumDoc;
}

export class TratamientoCliente implements ITratamientoCliente {
  constructor(
    public id?: number,
    public numSesiones?: number,
    public diagnostico?: string,
    public citas?: ICita[],
    public tratamiento?: ITratamiento,
    public numDoc?: INumDoc
  ) {}
}
