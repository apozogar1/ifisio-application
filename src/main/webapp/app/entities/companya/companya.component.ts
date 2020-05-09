import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompanya } from 'app/shared/model/companya.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CompanyaService } from './companya.service';
import { CompanyaDeleteDialogComponent } from './companya-delete-dialog.component';

@Component({
  selector: 'jhi-companya',
  templateUrl: './companya.component.html'
})
export class CompanyaComponent implements OnInit, OnDestroy {
  companyas: ICompanya[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected companyaService: CompanyaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.companyas = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.companyaService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICompanya[]>) => this.paginateCompanyas(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.companyas = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('companyaListModification', () => this.reset());
  }

  delete(companya: ICompanya): void {
    const modalRef = this.modalService.open(CompanyaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.companya = companya;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCompanyas(data: ICompanya[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.companyas.push(data[i]);
      }
    }
  }
}
