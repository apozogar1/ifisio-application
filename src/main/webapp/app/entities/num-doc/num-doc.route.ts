import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { INumDoc, NumDoc } from 'app/shared/model/num-doc.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ClienteService } from '../cliente/cliente.service';
import { NumDocService } from './num-doc.service';
import { NumDocUpdateComponent } from './num-doc-update.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class NumDocResolve implements Resolve<INumDoc> {
  constructor(private service: NumDocService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INumDoc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((numDoc: HttpResponse<NumDoc>) => {
          if (numDoc.body) {
            return of(numDoc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NumDoc());
  }
}

@Injectable({ providedIn: 'root' })
export class ClienteResolve implements Resolve<ICliente> {
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

export const numDocRoute: Routes = [
  {
    path: 'clientes/cliente/:id/num-doc/new',
    component: NumDocUpdateComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.numDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'clientes/num-doc/:id/edit',
    component: NumDocUpdateComponent,
    resolve: {
      numDoc: NumDocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.numDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
