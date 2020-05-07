import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

@Component({
  selector: 'jhi-tratamiento-cliente-detail',
  templateUrl: './tratamiento-cliente-detail.component.html'
})
export class TratamientoClienteDetailComponent implements OnInit {
  tratamientoCliente: ITratamientoCliente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tratamientoCliente }) => (this.tratamientoCliente = tratamientoCliente));
  }

  previousState(): void {
    window.history.back();
  }
}
