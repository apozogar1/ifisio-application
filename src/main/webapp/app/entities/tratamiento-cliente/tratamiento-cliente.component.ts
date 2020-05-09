import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TratamientoClienteService } from './tratamiento-cliente.service';
import { TratamientoClienteDeleteDialogComponent } from './tratamiento-cliente-delete-dialog.component';

@Component({
  selector: 'jhi-tratamiento-cliente',
  templateUrl: './tratamiento-cliente.component.html'
})
export class TratamientoClienteComponent implements OnInit, OnDestroy {
  tratamientoClientes: ITratamientoCliente[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.tratamientoClientes = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.tratamientoClienteService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITratamientoCliente[]>) => this.paginateTratamientoClientes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.tratamientoClientes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTratamientoClientes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITratamientoCliente): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTratamientoClientes(): void {
    this.eventSubscriber = this.eventManager.subscribe('tratamientoClienteListModification', () => this.reset());
  }

  delete(tratamientoCliente: ITratamientoCliente): void {
    const modalRef = this.modalService.open(TratamientoClienteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tratamientoCliente = tratamientoCliente;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTratamientoClientes(data: ITratamientoCliente[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.tratamientoClientes.push(data[i]);
      }
    }
  }
}
