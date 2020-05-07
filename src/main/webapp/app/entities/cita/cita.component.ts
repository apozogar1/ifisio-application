import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICita } from 'app/shared/model/cita.model';
import { CitaService } from './cita.service';
import { CitaDeleteDialogComponent } from './cita-delete-dialog.component';

@Component({
  selector: 'jhi-cita',
  templateUrl: './cita.component.html'
})
export class CitaComponent implements OnInit, OnDestroy {
  citas?: ICita[];
  eventSubscriber?: Subscription;

  constructor(protected citaService: CitaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.citaService.query().subscribe((res: HttpResponse<ICita[]>) => (this.citas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCitas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICita): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCitas(): void {
    this.eventSubscriber = this.eventManager.subscribe('citaListModification', () => this.loadAll());
  }

  delete(cita: ICita): void {
    const modalRef = this.modalService.open(CitaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cita = cita;
  }
}
