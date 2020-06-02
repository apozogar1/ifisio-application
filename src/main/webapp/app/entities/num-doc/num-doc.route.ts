import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INumDoc, NumDoc } from 'app/shared/model/num-doc.model';
import { NumDocService } from './num-doc.service';
import { NumDocComponent } from './num-doc.component';
import { NumDocDetailComponent } from './num-doc-detail.component';
import { NumDocUpdateComponent } from './num-doc-update.component';

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

export const numDocRoute: Routes = [
  {
    path: 'numDoc',
    component: NumDocComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.numDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'numDoc/:id/view',
    component: NumDocDetailComponent,
    resolve: {
      numDoc: NumDocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.numDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'numDoc/new',
    component: NumDocUpdateComponent,
    resolve: {
      numDoc: NumDocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iFisioApp.numDoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'numDoc/:id/edit',
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
