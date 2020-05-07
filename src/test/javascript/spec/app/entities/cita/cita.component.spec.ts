import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { CitaComponent } from 'app/entities/cita/cita.component';
import { CitaService } from 'app/entities/cita/cita.service';
import { Cita } from 'app/shared/model/cita.model';

describe('Component Tests', () => {
  describe('Cita Management Component', () => {
    let comp: CitaComponent;
    let fixture: ComponentFixture<CitaComponent>;
    let service: CitaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CitaComponent]
      })
        .overrideTemplate(CitaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CitaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CitaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cita(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.citas && comp.citas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
