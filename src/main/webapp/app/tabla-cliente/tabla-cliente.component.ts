import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICliente } from 'app/shared/model/cliente.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-tabla-cliente',
  templateUrl: './tabla-cliente.component.html'
})
export class TablaClienteComponent implements OnInit, OnDestroy {
  clientes: ICliente[];
  clientesNoFilter: ICliente[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  filtro: string;

  constructor(
    protected clienteService: ClienteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.clientes = [];
    this.clientesNoFilter = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
    this.filtro = "";
  }

  loadAll(): void {
    this.clienteService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICliente[]>) => this.paginateClientes(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.clientes = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClientes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICliente): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClientes(): void {
    this.eventSubscriber = this.eventManager.subscribe('clienteListModification', () => this.reset());
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateClientes(data: ICliente[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.clientes.push(data[i]);
      }
    }
    this.clientesNoFilter = this.clientes;
  }

  filtroCliente(): void {
    const tablaFiltrada = this.clientesNoFilter.filter(cliente =>
      // this.compareFilter(cliente.nombre, this.filtro) ||
      this.compareFilter(cliente.apellidos, this.filtro) ||
      cliente.numDocs?.find(numDoc => this.compareFilter(numDoc.companya?.nombre, this.filtro))
    );
    this.clientes = tablaFiltrada;
  }

  compareFilter(c1: any, c2: any): boolean {
    const c1ToCompare = this.removeAccents(c1?.toLowerCase());
    const c2ToCompare = this.removeAccents(c2?.toLowerCase());

    return c1ToCompare.includes(c2ToCompare);
  }

  removeAccents(str: any): string {
    const strAccents = str.split('');
    const strAccentsOut = [];
    const strAccentsLen = strAccents.length;
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (let y = 0; y < strAccentsLen; y++) {
      if (accents.includes(strAccents[y])) {
        strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
      } else
        strAccentsOut[y] = strAccents[y];
    }
    return strAccentsOut.join('');
  }
}
