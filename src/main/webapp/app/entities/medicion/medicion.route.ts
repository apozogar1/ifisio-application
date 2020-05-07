import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicion, Medicion } from 'app/shared/model/medicion.model';
import { MedicionService } from './medicion.service';
import { MedicionComponent } from './medicion.component';
import { MedicionDetailComponent } from './medicion-detail.component';
import { MedicionUpdateComponent } from './medicion-update.component';

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

export const medicionRoute: Routes = [
  {
    path: '',
    component: MedicionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.medicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedicionDetailComponent,
    resolve: {
      medicion: MedicionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.medicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedicionUpdateComponent,
    resolve: {
      medicion: MedicionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.medicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedicionUpdateComponent,
    resolve: {
      medicion: MedicionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.medicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
