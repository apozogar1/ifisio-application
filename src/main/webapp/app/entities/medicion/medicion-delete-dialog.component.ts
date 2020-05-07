import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicion } from 'app/shared/model/medicion.model';
import { MedicionService } from './medicion.service';

@Component({
  templateUrl: './medicion-delete-dialog.component.html'
})
export class MedicionDeleteDialogComponent {
  medicion?: IMedicion;

  constructor(protected medicionService: MedicionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicionListModification');
      this.activeModal.close();
    });
  }
}
