import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompanya, Companya } from 'app/shared/model/companya.model';
import { CompanyaService } from './companya.service';

@Component({
  selector: 'jhi-companya-update',
  templateUrl: './companya-update.component.html'
})
export class CompanyaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precioSesion: []
  });

  constructor(protected companyaService: CompanyaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ companya }) => {
      this.updateForm(companya);
    });
  }

  updateForm(companya: ICompanya): void {
    this.editForm.patchValue({
      id: companya.id,
      nombre: companya.nombre,
      precioSesion: companya.precioSesion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const companya = this.createFromForm();
    if (companya.id !== undefined) {
      this.subscribeToSaveResponse(this.companyaService.update(companya));
    } else {
      this.subscribeToSaveResponse(this.companyaService.create(companya));
    }
  }

  private createFromForm(): ICompanya {
    return {
      ...new Companya(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      precioSesion: this.editForm.get(['precioSesion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanya>>): void {
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
