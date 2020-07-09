import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICita, Cita } from 'app/shared/model/cita.model';
import { JhiEventManager } from 'ng-jhipster';
import { CitaService } from 'app/entities/cita/cita.service';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CitaDeleteDialogComponent } from 'app/entities/cita/cita-delete-dialog.component';


@Component({
  templateUrl: './agenda-dialog.component.html'
})
export class AgendaDialogComponent implements OnInit {
  cita?: ICita;
  isSaving = false;

  editForm = this.fb.group({
    nombre: [],
    fecha: [],
    comentarios: []
  });


  constructor(protected citaService: CitaService,
    public activeModal: NgbActiveModal,
    protected modalService: NgbModal,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm(): void {
    this.editForm.patchValue({
      comentarios: this.cita?.comentarios,
      nombre: this.cita?.tratamientoCliente?.numDoc?.cliente?.nombre + ' ' + this.cita?.tratamientoCliente?.numDoc?.cliente?.apellidos,
      fecha: moment(this.cita?.fechaHoraCita).format('MMMM Do YYYY, h:mm:ss a')
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  deleteCita(element: ICita): void {
    this.activeModal.close();
    const modalRef = this.modalService.open(CitaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cita = element;
  }

  updateCita(): void {
    this.isSaving = true;
    const cita = this.createFromForm();
    this.citaService.update(cita).subscribe(() => {
      this.activeModal.close();
    });
  }

  private createFromForm(): ICita {
    return {
      ...new Cita(),
      id: this.cita?.id,
      fechaHoraCita: moment(this.cita?.fechaHoraCita),
      comentarios: this.editForm.get(['comentarios'])!.value,
      tratamientoCliente: this.cita?.tratamientoCliente
    };
  }



}
