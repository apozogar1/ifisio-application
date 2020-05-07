import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompanya } from 'app/shared/model/companya.model';
import { CompanyaService } from './companya.service';
import { CompanyaDeleteDialogComponent } from './companya-delete-dialog.component';

@Component({
  selector: 'jhi-companya',
  templateUrl: './companya.component.html'
})
export class CompanyaComponent implements OnInit, OnDestroy {
  companyas?: ICompanya[];
  eventSubscriber?: Subscription;

  constructor(protected companyaService: CompanyaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.companyaService.query().subscribe((res: HttpResponse<ICompanya[]>) => (this.companyas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCompanyas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICompanya): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCompanyas(): void {
    this.eventSubscriber = this.eventManager.subscribe('companyaListModification', () => this.loadAll());
  }

  delete(companya: ICompanya): void {
    const modalRef = this.modalService.open(CompanyaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.companya = companya;
  }
}
