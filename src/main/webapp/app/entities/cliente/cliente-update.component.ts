import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ICompanya } from 'app/shared/model/companya.model';
import { CompanyaService } from 'app/entities/companya/companya.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;
  companyas: ICompanya[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellidos: [],
    telefono: [],
    fechaNacimiento: [],
    companya: []
  });

  constructor(
    protected clienteService: ClienteService,
    protected companyaService: CompanyaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (!cliente.id) {
        const today = moment().startOf('day');
        cliente.fechaNacimiento = today;
      }

      this.updateForm(cliente);

      this.companyaService.query().subscribe((res: HttpResponse<ICompanya[]>) => (this.companyas = res.body || []));
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      telefono: cliente.telefono,
      fechaNacimiento: cliente.fechaNacimiento ? cliente.fechaNacimiento.format(DATE_TIME_FORMAT) : null,
      companya: cliente.companya
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidos: this.editForm.get(['apellidos'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value
        ? moment(this.editForm.get(['fechaNacimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      companya: this.editForm.get(['companya'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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

  trackById(index: number, item: ICompanya): any {
    return item.id;
  }
}
