import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { INumDoc, NumDoc } from 'app/shared/model/num-doc.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NumDocUpdateComponent } from './num-doc-update.component';
import { NumDocService } from './num-doc.service';

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
    path: 'cliente/num-doc/new',
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
    path: 'cliente/num-doc/:id/edit',
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
