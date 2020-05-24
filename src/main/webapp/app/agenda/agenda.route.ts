import { Routes, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { AgendaComponent } from './agenda.component';
import { Injectable } from '@angular/core';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

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
      pageTitle: 'iFisioApp.agenda.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
