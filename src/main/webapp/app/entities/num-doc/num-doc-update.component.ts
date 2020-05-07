import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INumDoc, NumDoc } from 'app/shared/model/num-doc.model';
import { NumDocService } from './num-doc.service';
import { ICompanya } from 'app/shared/model/companya.model';
import { CompanyaService } from 'app/entities/companya/companya.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

type SelectableEntity = ICompanya | ICliente;

@Component({
  selector: 'jhi-num-doc-update',
  templateUrl: './num-doc-update.component.html'
})
export class NumDocUpdateComponent implements OnInit {
  isSaving = false;
  companyas: ICompanya[] = [];
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    companyia: [],
    numDoc: [],
    companya: [],
    cliente: []
  });

  constructor(
    protected numDocService: NumDocService,
    protected companyaService: CompanyaService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ numDoc }) => {
      this.updateForm(numDoc);

      this.companyaService.query().subscribe((res: HttpResponse<ICompanya[]>) => (this.companyas = res.body || []));

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(numDoc: INumDoc): void {
    this.editForm.patchValue({
      id: numDoc.id,
      companyia: numDoc.companyia,
      numDoc: numDoc.numDoc,
      companya: numDoc.companya,
      cliente: numDoc.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const numDoc = this.createFromForm();
    if (numDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.numDocService.update(numDoc));
    } else {
      this.subscribeToSaveResponse(this.numDocService.create(numDoc));
    }
  }

  private createFromForm(): INumDoc {
    return {
      ...new NumDoc(),
      id: this.editForm.get(['id'])!.value,
      companyia: this.editForm.get(['companyia'])!.value,
      numDoc: this.editForm.get(['numDoc'])!.value,
      companya: this.editForm.get(['companya'])!.value,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INumDoc>>): void {
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