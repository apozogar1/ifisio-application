import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<INumDoc>(this.resourceUrl, numDoc, { observe: 'response' });
  }

  update(numDoc: INumDoc): Observable<EntityResponseType> {
    return this.http.put<INumDoc>(this.resourceUrl, numDoc, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INumDoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INumDoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
