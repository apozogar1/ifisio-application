import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITratamientoCliente, TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { TratamientoClienteService } from './tratamiento-cliente.service';
import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { TratamientoService } from 'app/entities/tratamiento/tratamiento.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

type SelectableEntity = ITratamiento | ICliente;

@Component({
  selector: 'jhi-tratamiento-cliente-update',
  templateUrl: './tratamiento-cliente-update.component.html'
})
export class TratamientoClienteUpdateComponent implements OnInit {
  isSaving = false;
  tratamientos: ITratamiento[] = [];
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    numSesiones: [],
    diagnostico: [],
    precioSesion: [],
    expediente: [],
    tratamiento: [],
    cliente: []
  });

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    protected tratamientoService: TratamientoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tratamientoCliente }) => {
      this.updateForm(tratamientoCliente);

      this.tratamientoService.query().subscribe((res: HttpResponse<ITratamiento[]>) => (this.tratamientos = res.body || []));

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(tratamientoCliente: ITratamientoCliente): void {
    this.editForm.patchValue({
      id: tratamientoCliente.id,
      numSesiones: tratamientoCliente.numSesiones,
      diagnostico: tratamientoCliente.diagnostico,
      precioSesion: tratamientoCliente.precioSesion,
      expediente: tratamientoCliente.expediente,
      tratamiento: tratamientoCliente.tratamiento,
      cliente: tratamientoCliente.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tratamientoCliente = this.createFromForm();
    if (tratamientoCliente.id !== undefined) {
      this.subscribeToSaveResponse(this.tratamientoClienteService.update(tratamientoCliente));
    } else {
      this.subscribeToSaveResponse(this.tratamientoClienteService.create(tratamientoCliente));
    }
  }

  private createFromForm(): ITratamientoCliente {
    return {
      ...new TratamientoCliente(),
      id: this.editForm.get(['id'])!.value,
      numSesiones: this.editForm.get(['numSesiones'])!.value,
      diagnostico: this.editForm.get(['diagnostico'])!.value,
      precioSesion: this.editForm.get(['precioSesion'])!.value,
      expediente: this.editForm.get(['expediente'])!.value,
      tratamiento: this.editForm.get(['tratamiento'])!.value,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITratamientoCliente>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
