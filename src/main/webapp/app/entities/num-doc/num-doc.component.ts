import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INumDoc } from 'app/shared/model/num-doc.model';
import { NumDocService } from './num-doc.service';
import { NumDocDeleteDialogComponent } from './num-doc-delete-dialog.component';

@Component({
  selector: 'jhi-num-doc',
  templateUrl: './num-doc.component.html'
})
export class NumDocComponent implements OnInit, OnDestroy {
  numDocs?: INumDoc[];
  eventSubscriber?: Subscription;

  constructor(protected numDocService: NumDocService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.numDocService.query().subscribe((res: HttpResponse<INumDoc[]>) => (this.numDocs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNumDocs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INumDoc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNumDocs(): void {
    this.eventSubscriber = this.eventManager.subscribe('numDocListModification', () => this.loadAll());
  }

  delete(numDoc: INumDoc): void {
    const modalRef = this.modalService.open(NumDocDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.numDoc = numDoc;
  }
}
