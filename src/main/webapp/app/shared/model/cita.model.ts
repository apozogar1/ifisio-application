import { Moment } from 'moment';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

export interface ICita {
  id?: number;
  fechaHoraCita?: Moment;
  tratamientoCliente?: ITratamientoCliente;
}

export class Cita implements ICita {
  constructor(public id?: number, public fechaHoraCita?: Moment, public tratamientoCliente?: ITratamientoCliente) {}
}
