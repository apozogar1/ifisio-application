import { Moment } from 'moment';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

export interface ICita {
  id?: number;
  fechaHoraCita?: Moment;
  fechaHoraCitaFin?: Moment;
  comentarios?: string;
  tratamientoCliente?: ITratamientoCliente;
}

export class Cita implements ICita {
  constructor(public id?: number, public fechaHoraCita?: Moment, public fechaHoraCitaFin?: Moment, public comentarios?: string, public tratamientoCliente?: ITratamientoCliente) { }
}
