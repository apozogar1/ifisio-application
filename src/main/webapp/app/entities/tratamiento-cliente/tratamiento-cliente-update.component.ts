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
import { INumDoc } from 'app/shared/model/num-doc.model';
import { NumDocService } from 'app/entities/num-doc/num-doc.service';

type SelectableEntity = ITratamiento | INumDoc;

@Component({
  selector: 'jhi-tratamiento-cliente-update',
  templateUrl: './tratamiento-cliente-update.component.html'
})
export class TratamientoClienteUpdateComponent implements OnInit {
  isSaving = false;
  tratamientos: ITratamiento[] = [];
  numdocs: INumDoc[] = [];
  tratamientoCliente: TratamientoCliente = {};

  editForm = this.fb.group({
    id: [],
    numSesiones: [],
    diagnostico: [],
    tratamiento: [],
    precioSesion: [],
    numDoc: []
  });

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    protected tratamientoService: TratamientoService,
    protected numDocService: NumDocService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tratamientoCliente }) => {
      this.updateForm(tratamientoCliente);

      this.tratamientoService.query().subscribe((res: HttpResponse<ITratamiento[]>) => (this.tratamientos = res.body || []));

      this.numDocService.query().subscribe((res: HttpResponse<INumDoc[]>) => (this.numdocs = res.body || []));
    });
  }

  updateForm(tratamientoCliente: ITratamientoCliente): void {
    this.editForm.patchValue({
      id: tratamientoCliente.id,
      numSesiones: tratamientoCliente.numSesiones,
      diagnostico: tratamientoCliente.diagnostico,
      tratamiento: tratamientoCliente.tratamiento,
      precioSesion: tratamientoCliente.precioSesion,
      numDoc: tratamientoCliente.numDoc
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
      precioSesion: this.editForm.get(['precioSesion'])!.value,
      diagnostico: this.editForm.get(['diagnostico'])!.value,
      tratamiento: this.editForm.get(['tratamiento'])!.value,
      numDoc: this.editForm.get(['numDoc'])!.value
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

  public selTratamiento(): void {
    if (this.editForm.get(['tratamiento'])!.value != null) {
      const tratamiento = this.editForm.get(['tratamiento'])?.value;
      this.editForm.patchValue({
        id: this.tratamientoCliente.id,
        numSesiones: tratamiento?.numSesiones,
        diagnostico: tratamiento?.nombre,
        tratamiento: this.editForm.get(['tratamiento'])!.value,
        numDoc: this.editForm.get(['numDoc'])!.value
      });
    }
  }
}
