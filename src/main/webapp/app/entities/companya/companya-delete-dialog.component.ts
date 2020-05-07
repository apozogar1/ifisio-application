import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanya } from 'app/shared/model/companya.model';
import { CompanyaService } from './companya.service';

@Component({
  templateUrl: './companya-delete-dialog.component.html'
})
export class CompanyaDeleteDialogComponent {
  companya?: ICompanya;

  constructor(protected companyaService: CompanyaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.companyaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('companyaListModification');
      this.activeModal.close();
    });
  }
}
