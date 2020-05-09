import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicion } from 'app/shared/model/medicion.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MedicionService } from './medicion.service';
import { MedicionDeleteDialogComponent } from './medicion-delete-dialog.component';

@Component({
  selector: 'jhi-medicion',
  templateUrl: './medicion.component.html'
})
export class MedicionComponent implements OnInit, OnDestroy {
  medicions: IMedicion[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected medicionService: MedicionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.medicions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.medicionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IMedicion[]>) => this.paginateMedicions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.medicions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('medicionListModification', () => this.reset());
  }

  delete(medicion: IMedicion): void {
    const modalRef = this.modalService.open(MedicionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicion = medicion;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateMedicions(data: IMedicion[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.medicions.push(data[i]);
      }
    }
  }
}
