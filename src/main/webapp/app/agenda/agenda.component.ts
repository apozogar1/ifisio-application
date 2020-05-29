import { Component, OnDestroy, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CitaService } from 'app/entities/cita/cita.service';
import { ICita } from 'app/shared/model/cita.model';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'app/shared/model/cliente.model';
import { SelectItem } from 'primeng/api/selectitem';
import * as moment from 'moment';

@Component({
  selector: 'jhi-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
  events: any[] = [];

  options: any;
  cliente: ICliente;

  modeSel: String = 'dayGridMonth';
  dayDuration: Number = 1;
  mode: SelectItem[] = [
    { label: 'Mes', value: 'timeGridWeek' },
    { label: 'Semanal', value: 'dayGridWeek' },
    { label: 'Dia', value: 'timeGrid' }
  ];

  constructor(private citaService: CitaService, protected activatedRoute: ActivatedRoute) {
    this.cliente = {};
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cita }) => {
      this.cliente = cita;
      if (cita != null) {
        this.citaService.findByCliente(cita.id).subscribe((events: any) => this.loadCita(events.body));
      } else {
        this.citaService.query().subscribe((events: any) => this.loadCita(events.body));
      }
    });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      defaultView: this.modeSel,
      duration: { days: +this.dayDuration },
      aspectRatio: 3,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGrid'
      },
      editable: true,
      dateClick: this.dateClick
    };
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

  dateClick(e: any): void {}

  changeMode(): void {
    this.options = { ...this.options, defaultView: this.modeSel };
  }
}
