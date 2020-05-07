import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITratamiento } from 'app/shared/model/tratamiento.model';

type EntityResponseType = HttpResponse<ITratamiento>;
type EntityArrayResponseType = HttpResponse<ITratamiento[]>;

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  public resourceUrl = SERVER_API_URL + 'api/tratamientos';

  constructor(protected http: HttpClient) {}

  create(tratamiento: ITratamiento): Observable<EntityResponseType> {
    return this.http.post<ITratamiento>(this.resourceUrl, tratamiento, { observe: 'response' });
  }

  update(tratamiento: ITratamiento): Observable<EntityResponseType> {
    return this.http.put<ITratamiento>(this.resourceUrl, tratamiento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITratamiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITratamiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
