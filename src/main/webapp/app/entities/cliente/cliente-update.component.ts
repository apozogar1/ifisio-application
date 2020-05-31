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
import { INumDoc, NumDoc } from 'app/shared/model/num-doc.model';
import { CompanyaService } from '../companya/companya.service';
import { NumDocService } from '../num-doc/num-doc.service';
import { ICompanya, Companya } from 'app/shared/model/companya.model';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;
  companyas: ICompanya[] = [];
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellidos: [],
    telefono: [],
    fechaNacimiento: [],
    idNum: [],
    numDoc: [],
    fechaAlta: [],
    companya: []
  });

  constructor(protected clienteService: ClienteService, protected companyaService: CompanyaService, protected numDocService: NumDocService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (!cliente.id) {
        const today = moment().startOf('day');
        cliente.fechaNacimiento = today;
      }

      this.updateForm(cliente);
    });

    this.activatedRoute.data.subscribe(({ numDoc }) => {
      if (!numDoc.idNum) {
        const today = moment().startOf('day');
        numDoc.fechaAlta = today;
      }

      this.updateFormNumDoc(numDoc);

      this.companyaService.query().subscribe((res: HttpResponse<ICompanya[]>) => (this.companyas = res.body || []));

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      telefono: cliente.telefono,
      fechaNacimiento: cliente.fechaNacimiento ? cliente.fechaNacimiento.format(DATE_TIME_FORMAT) : null
    });
  }

  updateFormNumDoc(numDoc: INumDoc): void {
    this.editForm.patchValue({
      idNum: numDoc.id,
      numDoc: numDoc.numDoc,
      fechaAlta: numDoc.fechaAlta ? numDoc.fechaAlta.format(DATE_TIME_FORMAT) : null,
      companya: numDoc.companya,
      cliente: numDoc.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const numDoc = this.createFromFormNumDoc();

    if (numDoc.id !== undefined) {
      this.subscribeToSaveResponse(this.numDocService.update(numDoc));
    } else {
      this.subscribeToSaveResponse(this.numDocService.create(numDoc));
    }
  }

  private createFromFormCliente(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidos: this.editForm.get(['apellidos'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value
        ? moment(this.editForm.get(['fechaNacimiento'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  private createFromFormNumDoc(): INumDoc {
    return {
      ...new NumDoc(),
      id: this.editForm.get(['id'])!.value,
      numDoc: this.editForm.get(['numDoc'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      companya: this.createFromFormCompanya(),
      cliente: this.createFromFormCliente()
    };
  }

  private createFromFormCompanya(): ICompanya {
    return {
      ...new Companya(),
      id: this.editForm.get(['companya'])!.value
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
}
