import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMedicion, Medicion } from 'app/shared/model/medicion.model';
import { MedicionService } from './medicion.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-medicion-update',
  templateUrl: './medicion-update.component.html'
})
export class MedicionUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    peso: [],
    altura: [],
    imc: [],
    fechaMedicion: [],
    cliente: []
  });

  constructor(
    protected medicionService: MedicionService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicion }) => {
      if (!medicion.id) {
        const today = moment().startOf('day');
        medicion.fechaMedicion = today;
      }

      this.updateForm(medicion);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(medicion: IMedicion): void {
    this.editForm.patchValue({
      id: medicion.id,
      peso: medicion.peso,
      altura: medicion.altura,
      imc: medicion.imc,
      fechaMedicion: medicion.fechaMedicion ? medicion.fechaMedicion.format(DATE_TIME_FORMAT) : null,
      cliente: medicion.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicion = this.createFromForm();
    if (medicion.id !== undefined) {
      this.subscribeToSaveResponse(this.medicionService.update(medicion));
    } else {
      this.subscribeToSaveResponse(this.medicionService.create(medicion));
    }
  }

  private createFromForm(): IMedicion {
    return {
      ...new Medicion(),
      id: this.editForm.get(['id'])!.value,
      peso: this.editForm.get(['peso'])!.value,
      altura: this.editForm.get(['altura'])!.value,
      imc: this.editForm.get(['imc'])!.value,
      fechaMedicion: this.editForm.get(['fechaMedicion'])!.value
        ? moment(this.editForm.get(['fechaMedicion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicion>>): void {
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

  trackById(index: number, item: ICliente): any {
    return item.id;
  }
}
