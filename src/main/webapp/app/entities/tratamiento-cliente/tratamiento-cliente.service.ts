import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

type EntityResponseType = HttpResponse<ITratamientoCliente>;
type EntityArrayResponseType = HttpResponse<ITratamientoCliente[]>;

@Injectable({ providedIn: 'root' })
export class TratamientoClienteService {
  public resourceUrl = SERVER_API_URL + 'api/tratamiento-clientes';

  constructor(protected http: HttpClient) {}

  create(tratamientoCliente: ITratamientoCliente): Observable<EntityResponseType> {
    return this.http.post<ITratamientoCliente>(this.resourceUrl, tratamientoCliente, { observe: 'response' });
  }

  update(tratamientoCliente: ITratamientoCliente): Observable<EntityResponseType> {
    return this.http.put<ITratamientoCliente>(this.resourceUrl, tratamientoCliente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITratamientoCliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByCliente(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ITratamientoCliente[]>(`${this.resourceUrl}/cliente/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITratamientoCliente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
