import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITratamiento, Tratamiento } from 'app/shared/model/tratamiento.model';
import { TratamientoService } from './tratamiento.service';
import { TratamientoComponent } from './tratamiento.component';
import { TratamientoDetailComponent } from './tratamiento-detail.component';
import { TratamientoUpdateComponent } from './tratamiento-update.component';

@Injectable({ providedIn: 'root' })
export class TratamientoResolve implements Resolve<ITratamiento> {
  constructor(private service: TratamientoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITratamiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tratamiento: HttpResponse<Tratamiento>) => {
          if (tratamiento.body) {
            return of(tratamiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tratamiento());
  }
}

export const tratamientoRoute: Routes = [
  {
    path: '',
    component: TratamientoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TratamientoDetailComponent,
    resolve: {
      tratamiento: TratamientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TratamientoUpdateComponent,
    resolve: {
      tratamiento: TratamientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TratamientoUpdateComponent,
    resolve: {
      tratamiento: TratamientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.tratamiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
