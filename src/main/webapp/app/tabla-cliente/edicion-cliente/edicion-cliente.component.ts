import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'app/shared/model/cliente.model';

@Component({
  selector: 'jhi-edicion-cliente',
  templateUrl: './edicion-cliente.component.html'
})
export class EdicionClienteComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  constructor(
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (cliente != null && cliente.id != null) {
        this.cliente = cliente;
      }
    });
  }



}
