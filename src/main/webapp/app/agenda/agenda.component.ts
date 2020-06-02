import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaDeleteDialogComponent } from 'app/entities/cita/cita-delete-dialog.component';
import { CitaService } from 'app/entities/cita/cita.service';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { ICita } from 'app/shared/model/cita.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import * as moment from 'moment';
import { JhiEventManager } from 'ng-jhipster';
import { SelectItem } from 'primeng/api/selectitem';
import { Subscription } from 'rxjs';
import { FullCalendar } from 'primeng/fullcalendar/public_api';

@Component({
  selector: 'jhi-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
  events: any[] = [];
  citas: ICita[] = [];
  citaSel: ICita = {};

  eventSubscriber?: Subscription;

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

  @ViewChild('fc') fc: FullCalendar | undefined;

  constructor(
    private citaService: CitaService,
    private tratamientoClienteService: TratamientoClienteService,
    protected modalService: NgbModal,
    protected eventManager: JhiEventManager,
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

    this.registerChangeInCitaDelete();

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      defaultView: this.modeSel,
      droppable: true,
      aspectRatio: 3,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGrid'
      },
      editable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDragStop.bind(this)
      // eventData: this.handleEventDragStop.bind(this)
    };
  }

  handleDateClick(e: any): void {
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
  }

  handleEventDragStop(info: any): void {
    const cita = this.citas.find((citaAux: ICita) => citaAux.id === +info.event.id);
    if (cita != null) {
      cita.fechaHoraCita = moment(info.event.start);
      this.citaService.update(cita).subscribe(() => {});
    }
  }

  handleEventClick(e: any): void {
    const element = this.events.find(citaAux => citaAux.id === +e.event.id);
    const modalRef = this.modalService.open(CitaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cita = element;
    this.citaSel = element;
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
    this.citas = elements;
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

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  changeMode(): void {
    this.options = { ...this.options, defaultView: this.modeSel };
  }

  cancel(): void {
    this.modalCita = false;
  }

  registerChangeInCitaDelete(): void {
    this.eventSubscriber = this.eventManager.subscribe('citaListModification', () => {
      this.options.remove(this.citaSel.id);
    });
  }
}
