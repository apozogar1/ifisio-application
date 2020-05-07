import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICita, Cita } from 'app/shared/model/cita.model';
import { CitaService } from './cita.service';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';

@Component({
  selector: 'jhi-cita-update',
  templateUrl: './cita-update.component.html'
})
export class CitaUpdateComponent implements OnInit {
  isSaving = false;
  tratamientoclientes: ITratamientoCliente[] = [];

  editForm = this.fb.group({
    id: [],
    fechaHoraCita: [],
    tratamientoCliente: []
  });

  constructor(
    protected citaService: CitaService,
    protected tratamientoClienteService: TratamientoClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cita }) => {
      if (!cita.id) {
        const today = moment().startOf('day');
        cita.fechaHoraCita = today;
      }

      this.updateForm(cita);

      this.tratamientoClienteService
        .query()
        .subscribe((res: HttpResponse<ITratamientoCliente[]>) => (this.tratamientoclientes = res.body || []));
    });
  }

  updateForm(cita: ICita): void {
    this.editForm.patchValue({
      id: cita.id,
      fechaHoraCita: cita.fechaHoraCita ? cita.fechaHoraCita.format(DATE_TIME_FORMAT) : null,
      tratamientoCliente: cita.tratamientoCliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cita = this.createFromForm();
    if (cita.id !== undefined) {
      this.subscribeToSaveResponse(this.citaService.update(cita));
    } else {
      this.subscribeToSaveResponse(this.citaService.create(cita));
    }
  }

  private createFromForm(): ICita {
    return {
      ...new Cita(),
      id: this.editForm.get(['id'])!.value,
      fechaHoraCita: this.editForm.get(['fechaHoraCita'])!.value
        ? moment(this.editForm.get(['fechaHoraCita'])!.value, DATE_TIME_FORMAT)
        : undefined,
      tratamientoCliente: this.editForm.get(['tratamientoCliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICita>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITratamientoCliente): any {
    return item.id;
  }
}
