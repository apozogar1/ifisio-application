import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { TratamientoClienteService } from './tratamiento-cliente.service';

@Component({
  templateUrl: './tratamiento-cliente-delete-dialog.component.html'
})
export class TratamientoClienteDeleteDialogComponent {
  tratamientoCliente?: ITratamientoCliente;

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tratamientoClienteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tratamientoClienteListModification');
      this.activeModal.close();
    });
  }
}
