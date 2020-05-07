import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITratamiento, Tratamiento } from 'app/shared/model/tratamiento.model';
import { TratamientoService } from './tratamiento.service';

@Component({
  selector: 'jhi-tratamiento-update',
  templateUrl: './tratamiento-update.component.html'
})
export class TratamientoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    numSesiones: []
  });

  constructor(protected tratamientoService: TratamientoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tratamiento }) => {
      this.updateForm(tratamiento);
    });
  }

  updateForm(tratamiento: ITratamiento): void {
    this.editForm.patchValue({
      id: tratamiento.id,
      nombre: tratamiento.nombre,
      numSesiones: tratamiento.numSesiones
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tratamiento = this.createFromForm();
    if (tratamiento.id !== undefined) {
      this.subscribeToSaveResponse(this.tratamientoService.update(tratamiento));
    } else {
      this.subscribeToSaveResponse(this.tratamientoService.create(tratamiento));
    }
  }

  private createFromForm(): ITratamiento {
    return {
      ...new Tratamiento(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      numSesiones: this.editForm.get(['numSesiones'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITratamiento>>): void {
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
}
