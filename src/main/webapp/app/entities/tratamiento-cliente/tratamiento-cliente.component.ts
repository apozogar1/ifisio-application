import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { TratamientoClienteService } from './tratamiento-cliente.service';
import { TratamientoClienteDeleteDialogComponent } from './tratamiento-cliente-delete-dialog.component';

@Component({
  selector: 'jhi-tratamiento-cliente',
  templateUrl: './tratamiento-cliente.component.html'
})
export class TratamientoClienteComponent implements OnInit, OnDestroy {
  tratamientoClientes?: ITratamientoCliente[];
  eventSubscriber?: Subscription;

  constructor(
    protected tratamientoClienteService: TratamientoClienteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tratamientoClienteService
      .query()
      .subscribe((res: HttpResponse<ITratamientoCliente[]>) => (this.tratamientoClientes = res.body || []));
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
    this.eventSubscriber = this.eventManager.subscribe('tratamientoClienteListModification', () => this.loadAll());
  }

  delete(tratamientoCliente: ITratamientoCliente): void {
    const modalRef = this.modalService.open(TratamientoClienteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tratamientoCliente = tratamientoCliente;
  }
}
