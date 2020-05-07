import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITratamientoCliente, TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';
import { TratamientoClienteService } from './tratamiento-cliente.service';
import { TratamientoClienteComponent } from './tratamiento-cliente.component';
import { TratamientoClienteDetailComponent } from './tratamiento-cliente-detail.component';
import { TratamientoClienteUpdateComponent } from './tratamiento-cliente-update.component';

@Injectable({ providedIn: 'root' })
export class TratamientoClienteResolve implements Resolve<ITratamientoCliente> {
  constructor(private service: TratamientoClienteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITratamientoCliente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tratamientoCliente: HttpResponse<TratamientoCliente>) => {
          if (tratamientoCliente.body) {
            return of(tratamientoCliente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TratamientoCliente());
  }
}

export const tratamientoClienteRoute: Routes = [
  {
    path: '',
    component: TratamientoClienteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TratamientoClienteDetailComponent,
    resolve: {
      tratamientoCliente: TratamientoClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TratamientoClienteUpdateComponent,
    resolve: {
      tratamientoCliente: TratamientoClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TratamientoClienteUpdateComponent,
    resolve: {
      tratamientoCliente: TratamientoClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamientoCliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
