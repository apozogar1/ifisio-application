import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITratamiento } from 'app/shared/model/tratamiento.model';
import { TratamientoService } from './tratamiento.service';
import { TratamientoDeleteDialogComponent } from './tratamiento-delete-dialog.component';

@Component({
  selector: 'jhi-tratamiento',
  templateUrl: './tratamiento.component.html'
})
export class TratamientoComponent implements OnInit, OnDestroy {
  tratamientos?: ITratamiento[];
  eventSubscriber?: Subscription;

  constructor(
    protected tratamientoService: TratamientoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tratamientoService.query().subscribe((res: HttpResponse<ITratamiento[]>) => (this.tratamientos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTratamientos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITratamiento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTratamientos(): void {
    this.eventSubscriber = this.eventManager.subscribe('tratamientoListModification', () => this.loadAll());
  }

  delete(tratamiento: ITratamiento): void {
    const modalRef = this.modalService.open(TratamientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tratamiento = tratamiento;
  }
}
