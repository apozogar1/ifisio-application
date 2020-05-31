import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CitaService } from 'app/entities/cita/cita.service';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { ICita } from 'app/shared/model/cita.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'jhi-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
  events: any[] = [];

  options: any;
  cliente: ICliente;
  modalCita = false;
  numDiasPendientes: Number = 10;

  modeSel: String = 'dayGridMonth';

  tratamientoSel: ITratamientoCliente = {};
  tratamientosClientes: SelectItem[] = [
    {
      label: 'Seleccione uno',
      value: null
    }
  ];

  constructor(
    private citaService: CitaService,
    private tratamientoClienteService: TratamientoClienteService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.cliente = {};
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cita }) => {
      this.cliente = cita;
      if (cita != null) {
        this.citaService.findByCliente(cita.id).subscribe((events: any) => this.loadCita(events.body));
        this.tratamientoClienteService.findByCliente(cita.id).subscribe((events: any) => this.loadTratamientos(events.body));
      } else {
        this.citaService.query().subscribe((events: any) => this.loadCita(events.body));
      }
    });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      defaultView: this.modeSel,
      aspectRatio: 3,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGrid'
      },
      editable: true,
      dateClick: (e: any) => {
        if (this.tratamientoSel != null && this.tratamientoSel.id != null) {
          const cita = { fechaHoraCita: moment(e.date), tratamientoCliente: this.tratamientoSel };
          this.citaService.create(cita).subscribe((response: any) => {
            const citaNew = response.body;
            this.events = [
              ...this.events,
              {
                id: citaNew.id,
                title: citaNew.tratamientoCliente?.numDoc?.cliente?.nombre + ' ' + citaNew.tratamientoCliente?.numDoc?.cliente?.apellidos,
                start: citaNew.fechaHoraCita instanceof moment ? citaNew.fechaHoraCita.format() : citaNew.fechaHoraCita
              }
            ];
          });
        }
        // this.modalCita = true;
      }
    };
  }

  loadTratamientos(elements: ICita[]): void {
    this.tratamientosClientes = this.tratamientosClientes.concat(
      elements.map((tratamientoCliente: ITratamientoCliente) => {
        return {
          label: tratamientoCliente.tratamiento?.nombre,
          value: tratamientoCliente
        };
      })
    );
  }

  loadCita(elements: ICita[]): void {
    this.events = elements.map((cita: ICita) => {
      return {
        id: cita.id,
        title: cita.tratamientoCliente?.numDoc?.cliente?.nombre + ' ' + cita.tratamientoCliente?.numDoc?.cliente?.apellidos,
        start: cita.fechaHoraCita instanceof moment ? cita.fechaHoraCita.format() : cita.fechaHoraCita
      };
    });
    if (this.cliente != null) {
      this.modeSel = 'timeGrid';
    } else {
      this.modeSel = 'dayGridMonth';
    }
    this.changeMode();
  }

  ngOnDestroy(): void {}

  changeMode(): void {
    this.options = { ...this.options, defaultView: this.modeSel };
  }

  cancel(): void {
    this.modalCita = false;
  }
}
