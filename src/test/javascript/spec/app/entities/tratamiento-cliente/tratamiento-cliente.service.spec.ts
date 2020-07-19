import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { ITratamientoCliente, TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

describe('Service Tests', () => {
  describe('TratamientoCliente Service', () => {
    let injector: TestBed;
    let service: TratamientoClienteService;
    let httpMock: HttpTestingController;
    let elemDefault: ITratamientoCliente;
    let expectedResult: ITratamientoCliente | ITratamientoCliente[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TratamientoClienteService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TratamientoCliente(0, 0, 'AAAAAAA', 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TratamientoCliente', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TratamientoCliente()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TratamientoCliente', () => {
        const returnedFromService = Object.assign(
          {
            numSesiones: 1,
            diagnostico: 'BBBBBB',
            precioSesion: 1,
            expediente: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TratamientoCliente', () => {
        const returnedFromService = Object.assign(
          {
            numSesiones: 1,
            diagnostico: 'BBBBBB',
            precioSesion: 1,
            expediente: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TratamientoCliente', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
