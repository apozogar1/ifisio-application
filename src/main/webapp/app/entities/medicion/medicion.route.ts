import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { IMedicion, Medicion } from 'app/shared/model/medicion.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ClienteService } from '../cliente/cliente.service';
import { MedicionService } from './medicion.service';

@Injectable({ providedIn: 'root' })
export class MedicionResolve implements Resolve<IMedicion> {
  constructor(private service: MedicionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicion: HttpResponse<Medicion>) => {
          if (medicion.body) {
            return of(medicion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Medicion());
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

export const medicionRoute: Routes = [
  // {
  //   path: '/medicion/:id',
  //   resolve: {
  //     cliente: ClienteResolve
  //   },
  //   component: MedicionComponent,
  //   data: {
  //     authorities: [Authority.USER],
  //     pageTitle: 'iFisioApp.medicion.home.title'
  //   },
  //   canActivate: [UserRouteAccessService]
  // },
  // {
  //   path: '/medicion/:id/view',
  //   component: MedicionDetailComponent,
  //   resolve: {
  //     medicion: MedicionResolve
  //   },
  //   data: {
  //     authorities: [Authority.USER],
  //     pageTitle: 'iFisioApp.medicion.home.title'
  //   },
  //   canActivate: [UserRouteAccessService]
  // },
  // {
  //   path: '/medicion/new',
  //   component: MedicionUpdateComponent,
  //   resolve: {
  //     medicion: MedicionResolve
  //   },
  //   data: {
  //     authorities: [Authority.USER],
  //     pageTitle: 'iFisioApp.medicion.home.title'
  //   },
  //   canActivate: [UserRouteAccessService]
  // },
  // {
  //   path: '/medicion/:id/edit',
  //   component: MedicionUpdateComponent,
  //   resolve: {
  //     medicion: MedicionResolve
  //   },
  //   data: {
  //     authorities: [Authority.USER],
  //     pageTitle: 'iFisioApp.medicion.home.title'
  //   },
  //   canActivate: [UserRouteAccessService]
  // }
];
