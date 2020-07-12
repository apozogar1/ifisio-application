import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from 'app/entities/cita/cita.service';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { ICita } from 'app/shared/model/cita.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import Utils from 'app/utils/utils';
import * as moment from 'moment';
import { JhiEventManager } from 'ng-jhipster';
import { SelectItem } from 'primeng/api/selectitem';
import { FullCalendar } from 'primeng/fullcalendar/public_api';
import { Subscription } from 'rxjs';
import { AgendaDialogComponent } from './agenda-dialog.component';
import { MessageService } from 'primeng/api';


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
  numDiasPendientes: any = 10;

  modeSel: String = 'timeGridWeek';

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
    protected activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.cliente = {};
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.cliente = cliente;
      if (cliente != null) {
        this.citaService.findByCliente(cliente.id).subscribe((events: any) => this.loadCita(events.body));
        this.tratamientoClienteService.findByCliente(cliente.id).subscribe((events: any) => this.loadTratamientos(events.body));
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
      locale: 'es',
      firstDay: 1,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGrid'
      },
      editable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDragStop.bind(this),
      eventResize: this.handleEventResize.bind(this)
    };
  }

  handleDateClick(e: any): void {
    if (this.tratamientoSel != null && this.tratamientoSel.id != null && this.validateCita(e.date, e.id)) {
      const startCita = moment(e.date);
      const endCita = moment(e.date).add(1, 'hours');
      const cita = { fechaHoraCita: startCita, fechaHoraCitaFin: endCita, tratamientoCliente: this.tratamientoSel };
      this.citaService.create(cita).subscribe((response: any) => {
        const citaNew = response.body;
        this.citas.push(citaNew);
        this.numDiasPendientes--;
        this.events = [
          ...this.events,
          this.mapCitaToEvent(citaNew)
        ];
      });
    }
  }

  updateCita(cita: ICita): void {
    this.citaService.update(cita).subscribe((citaDb: any) => {
      this.citas = [...this.citas.filter(citaAux => citaDb.body.id !== citaAux.id)];
      this.citas.push(citaDb.body);
    });
  }

  handleEventResize(info: any): void {
    const cita = this.citas.find((citaAux: ICita) => citaAux.id === +info.event.id);
    if (cita != null) {
      cita.fechaHoraCita = moment(info.event.start);
      cita.fechaHoraCitaFin = moment(info.event.end);
      this.updateCita(cita);
    }
  }

  handleEventDragStop(info: any): void {
    const cita = this.citas.find((citaAux: ICita) => citaAux.id === +info.event.id);
    if (cita != null && this.validateCita(info.event.start, +info.event.id)) {
      cita.fechaHoraCita = moment(info.event.start);
      cita.fechaHoraCitaFin = moment(info.event.end);
      this.updateCita(cita);
    } else {
      const filterDel = this.events.filter(citaAux => citaAux.id !== cita?.id);
      filterDel.push(this.mapCitaToEvent(cita));
      this.events = [...filterDel];
    }
  }

  handleEventClick(e: any): void {
    const element = this.events.find(citaAux => citaAux.id === +e.event.id);
    const cita = this.citas.find(citaAux => citaAux.id === +e.event.id);
    const modalRef = this.modalService.open(AgendaDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cita = cita;
    this.citaSel = element;
  }

  loadTratamientos(elements: ICita[]): void {
    this.tratamientosClientes = this.tratamientosClientes.concat(
      elements.map((tratamientoCliente: ITratamientoCliente) => {
        return {
          label: tratamientoCliente.diagnostico,
          value: tratamientoCliente
        };
      })
    );
  }

  loadCita(elements: ICita[]): void {
    this.citas = [...elements];
    this.events = elements.map((cita: ICita) => {
      return this.mapCitaToEvent(cita);
    });
    if (this.cliente != null) {
      this.modeSel = 'timeGrid';
    } else {
      this.modeSel = 'dayGridMonth';
    }
    this.changeMode();
  }

  private mapCitaToEvent(cita: ICita | undefined): { id: number | undefined; title: string; start: string | moment.Moment | undefined; end: string | moment.Moment | undefined; } {
    return {
      id: cita?.id,
      title: Utils.formatName(cita?.tratamientoCliente?.numDoc?.cliente?.nombre, cita?.tratamientoCliente?.numDoc?.cliente?.apellidos) + ' - ' + cita?.tratamientoCliente?.diagnostico,
      start: cita?.fechaHoraCita instanceof moment ? cita?.fechaHoraCita.format() : cita?.fechaHoraCita,
      end: cita?.fechaHoraCitaFin instanceof moment ? cita?.fechaHoraCitaFin.format() : cita?.fechaHoraCitaFin
    };
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
      this.citas = [...this.citas.filter(citaAux => citaAux.id !== this.citaSel.id)];
      this.events = [...this.events.filter(citaAux => citaAux.id !== this.citaSel.id)];
      this.calcuteDays();
    });
  }

  calcuteDays(): void {
    if (this.tratamientoSel?.numSesiones != null) {
      const citasByTratamiento = this.citas.filter(cita => {
        return cita.tratamientoCliente?.id === this.tratamientoSel.id;
      });
      this.numDiasPendientes = this.tratamientoSel.numSesiones - citasByTratamiento.length;

      const filterCitasTratamientos = citasByTratamiento.map(cita => this.mapCitaToEvent(cita));
      this.events = [...filterCitasTratamientos];
    } else {
      const filterCitasTratamientos = this.citas.map(cita => this.mapCitaToEvent(cita));
      this.events = [...filterCitasTratamientos];
    }
  }

  validateCita(dateStr: string | Date, id: any): boolean {
    let isOk = true;

    // Que no se creen dos citas en el mismo
    const start = moment(dateStr).format('YYYYMMDD');
    const existeDia = this.citas.find(cita => {
      const fechaHoraCita = moment(cita.fechaHoraCita).format('YYYYMMDD');
      return start === fechaHoraCita && cita.id !== id && cita.tratamientoCliente?.id === this.tratamientoSel.id;
    });
    if (existeDia != null) {
      this.messageService.add({ severity: 'warn', summary: 'Validación', detail: 'No se puede poner el mismo dia.' });
      isOk = false;
    }

    // No tienes mas citas
    if (this.numDiasPendientes < 1) {
      this.messageService.add({ severity: 'warn', summary: 'Validación', detail: 'Ya no le quedan mas citas.' });
      isOk = false;
    }
    return isOk;
  }
}
