import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INumDoc } from 'app/shared/model/num-doc.model';

type EntityResponseType = HttpResponse<INumDoc>;
type EntityArrayResponseType = HttpResponse<INumDoc[]>;

@Injectable({ providedIn: 'root' })
export class NumDocService {
  public resourceUrl = SERVER_API_URL + 'api/num-docs';

  constructor(protected http: HttpClient) {}

  create(numDoc: INumDoc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(numDoc);
    return this.http
      .post<INumDoc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(numDoc: INumDoc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(numDoc);
    return this.http
      .put<INumDoc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INumDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByCliente(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INumDoc[]>(`${this.resourceUrl}/cliente/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getAllNumDocsByCliente(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<INumDoc[]>(`${this.resourceUrl}/cliente/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INumDoc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(numDoc: INumDoc): INumDoc {
    const copy: INumDoc = Object.assign({}, numDoc, {
      fechaAlta: numDoc.fechaAlta && numDoc.fechaAlta.isValid() ? numDoc.fechaAlta.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaAlta = res.body.fechaAlta ? moment(res.body.fechaAlta) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((numDoc: INumDoc) => {
        numDoc.fechaAlta = numDoc.fechaAlta ? moment(numDoc.fechaAlta) : undefined;
      });
    }
    return res;
  }
}
