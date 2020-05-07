import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICita } from 'app/shared/model/cita.model';
import { CitaService } from './cita.service';

@Component({
  templateUrl: './cita-delete-dialog.component.html'
})
export class CitaDeleteDialogComponent {
  cita?: ICita;

  constructor(protected citaService: CitaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.citaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('citaListModification');
      this.activeModal.close();
    });
  }
}
