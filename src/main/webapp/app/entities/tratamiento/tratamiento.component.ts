import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITratamiento } from 'app/shared/model/tratamiento.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TratamientoService } from './tratamiento.service';
import { TratamientoDeleteDialogComponent } from './tratamiento-delete-dialog.component';

@Component({
  selector: 'jhi-tratamiento',
  templateUrl: './tratamiento.component.html'
})
export class TratamientoComponent implements OnInit, OnDestroy {
  tratamientos: ITratamiento[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected tratamientoService: TratamientoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.tratamientos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.tratamientoService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITratamiento[]>) => this.paginateTratamientos(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.tratamientos = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('tratamientoListModification', () => this.reset());
  }

  delete(tratamiento: ITratamiento): void {
    const modalRef = this.modalService.open(TratamientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tratamiento = tratamiento;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTratamientos(data: ITratamiento[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.tratamientos.push(data[i]);
      }
    }
  }
}
