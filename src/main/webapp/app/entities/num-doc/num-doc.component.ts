import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INumDoc } from 'app/shared/model/num-doc.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NumDocService } from './num-doc.service';
import { NumDocDeleteDialogComponent } from './num-doc-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-num-doc',
  templateUrl: './num-doc.component.html'
})
export class NumDocComponent implements OnInit, OnDestroy {
  numDocs: INumDoc[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected numDocService: NumDocService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.numDocs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (cliente != null && cliente.id != null) {
        this.numDocService
          .getAllNumDocsByCliente(cliente.id)
          .subscribe((res: HttpResponse<INumDoc[]>) => this.paginateNumDocs(res.body, res.headers));
      }
    });
  }

  reset(): void {
    this.page = 0;
    this.numDocs = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('numDocListModification', () => this.reset());
  }

  delete(numDoc: INumDoc): void {
    const modalRef = this.modalService.open(NumDocDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.numDoc = numDoc;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNumDocs(data: INumDoc[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.numDocs.push(data[i]);
      }
    }
  }
}
