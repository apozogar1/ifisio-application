import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicion } from 'app/shared/model/medicion.model';
import { MedicionService } from './medicion.service';
import { MedicionDeleteDialogComponent } from './medicion-delete-dialog.component';

@Component({
  selector: 'jhi-medicion',
  templateUrl: './medicion.component.html'
})
export class MedicionComponent implements OnInit, OnDestroy {
  medicions?: IMedicion[];
  eventSubscriber?: Subscription;

  constructor(protected medicionService: MedicionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.medicionService.query().subscribe((res: HttpResponse<IMedicion[]>) => (this.medicions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicions(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicionListModification', () => this.loadAll());
  }

  delete(medicion: IMedicion): void {
    const modalRef = this.modalService.open(MedicionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicion = medicion;
  }
}
