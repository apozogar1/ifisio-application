import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicion } from 'app/shared/model/medicion.model';

type EntityResponseType = HttpResponse<IMedicion>;
type EntityArrayResponseType = HttpResponse<IMedicion[]>;

@Injectable({ providedIn: 'root' })
export class MedicionService {
  public resourceUrl = SERVER_API_URL + 'api/medicions';

  constructor(protected http: HttpClient) {}

  create(medicion: IMedicion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(medicion);
    return this.http
      .post<IMedicion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(medicion: IMedicion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(medicion);
    return this.http
      .put<IMedicion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMedicion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMedicion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(medicion: IMedicion): IMedicion {
    const copy: IMedicion = Object.assign({}, medicion, {
      fechaMedicion: medicion.fechaMedicion && medicion.fechaMedicion.isValid() ? medicion.fechaMedicion.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaMedicion = res.body.fechaMedicion ? moment(res.body.fechaMedicion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((medicion: IMedicion) => {
        medicion.fechaMedicion = medicion.fechaMedicion ? moment(medicion.fechaMedicion) : undefined;
      });
    }
    return res;
  }
}
