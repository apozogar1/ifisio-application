import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { Authority } from 'app/shared/constants/authority.constants';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AgendaComponent } from './agenda.component';

@Injectable({ providedIn: 'root' })
export class AgendaResolve implements Resolve<ICliente> {
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

export const AgendaRoute: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.agenda.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'agenda/:id',
    component: AgendaComponent,
    resolve: {
      cliente: AgendaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.agenda.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
