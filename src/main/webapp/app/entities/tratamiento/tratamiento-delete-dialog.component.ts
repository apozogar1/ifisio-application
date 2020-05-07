import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { TratamientoService } from './tratamiento.service';

@Component({
  templateUrl: './tratamiento-delete-dialog.component.html'
})
export class TratamientoDeleteDialogComponent {
  tratamiento?: ITratamiento;

  constructor(
    protected tratamientoService: TratamientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tratamientoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tratamientoListModification');
      this.activeModal.close();
    });
  }
}
