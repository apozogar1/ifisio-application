import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INumDoc } from 'app/shared/model/num-doc.model';
import { NumDocService } from './num-doc.service';

@Component({
  templateUrl: './num-doc-delete-dialog.component.html'
})
export class NumDocDeleteDialogComponent {
  numDoc?: INumDoc;

  constructor(protected numDocService: NumDocService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.numDocService.delete(id).subscribe(() => {
      this.eventManager.broadcast('numDocListModification');
      this.activeModal.close();
    });
  }
}
