import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CitaService } from 'app/entities/cita/cita.service';
import { ICita, Cita } from 'app/shared/model/cita.model';

describe('Service Tests', () => {
  describe('Cita Service', () => {
    let injector: TestBed;
    let service: CitaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICita;
    let expectedResult: ICita | ICita[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CitaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cita(0, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraCita: currentDate.format(DATE_TIME_FORMAT),
            fechaHoraCitaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cita', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaHoraCita: currentDate.format(DATE_TIME_FORMAT),
            fechaHoraCitaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHoraCita: currentDate,
            fechaHoraCitaFin: currentDate
          },
          returnedFromService
        );

        service.create(new Cita()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cita', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraCita: currentDate.format(DATE_TIME_FORMAT),
            fechaHoraCitaFin: currentDate.format(DATE_TIME_FORMAT),
            comentarios: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHoraCita: currentDate,
            fechaHoraCitaFin: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cita', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraCita: currentDate.format(DATE_TIME_FORMAT),
            fechaHoraCitaFin: currentDate.format(DATE_TIME_FORMAT),
            comentarios: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHoraCita: currentDate,
            fechaHoraCitaFin: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cita', () => {
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
