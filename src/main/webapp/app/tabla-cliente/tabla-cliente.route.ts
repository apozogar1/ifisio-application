import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { TablaClienteComponent } from './tabla-cliente.component';
import { EdicionClienteComponent } from './edicion-cliente/edicion-cliente.component';

@Injectable({ providedIn: 'root' })
export class TablaClienteResolve implements Resolve<ICliente> {
  constructor(private service: ClienteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICliente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cliente: HttpResponse<Cliente>) => {
          if (cliente.body) {
            return of(cliente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cliente());
  }
}

export const tablaClienteRoute: Routes = [
  {
    path: 'clientes',
    component: TablaClienteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
  ,  {
    path: 'clientes/cliente/:id',
    component: EdicionClienteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
  ,  {
    path: 'clientes/cliente/new',
    component: EdicionClienteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
