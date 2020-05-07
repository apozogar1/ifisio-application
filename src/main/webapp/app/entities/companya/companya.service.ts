import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICompanya } from 'app/shared/model/companya.model';

type EntityResponseType = HttpResponse<ICompanya>;
type EntityArrayResponseType = HttpResponse<ICompanya[]>;

@Injectable({ providedIn: 'root' })
export class CompanyaService {
  public resourceUrl = SERVER_API_URL + 'api/companyas';

  constructor(protected http: HttpClient) {}

  create(companya: ICompanya): Observable<EntityResponseType> {
    return this.http.post<ICompanya>(this.resourceUrl, companya, { observe: 'response' });
  }

  update(companya: ICompanya): Observable<EntityResponseType> {
    return this.http.put<ICompanya>(this.resourceUrl, companya, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompanya>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompanya[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
