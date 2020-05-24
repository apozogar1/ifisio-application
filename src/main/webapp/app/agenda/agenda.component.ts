import { Component, OnDestroy, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CitaService } from 'app/entities/cita/cita.service';
import { ICita } from 'app/shared/model/cita.model';

@Component({
  selector: 'jhi-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
  events: any[] = [];

  options: any;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.query().subscribe((events: any) => {
      this.events = events.body.map((cita: ICita) => {
        return {
          id: cita.id,
          title: cita.tratamientoCliente?.numDoc?.cliente?.nombre + ' ' + cita.tratamientoCliente?.numDoc?.cliente?.apellidos,
          start: cita.fechaHoraCita?.format()
        };
      });
    });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      dateClick: this.dateClick
    };
  }

  ngOnDestroy(): void {}

  update(): void {
    //incorrect
    this.events.push({
      title: 'Conference',
      start: '2016-01-11',
      end: '2016-01-13'
    });

    //correct
    this.events = [
      ...this.events,
      {
        title: 'Conference',
        start: '2016-01-11',
        end: '2016-01-13'
      }
    ];

    //incorrect
    this.options.weekends = false;

    //correct
    this.options = { ...this.options, weekends: false };
  }

  dateClick(e: any): void {
    // console.log(e);
  }
}
