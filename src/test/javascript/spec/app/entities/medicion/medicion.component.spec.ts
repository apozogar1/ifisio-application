import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { MedicionComponent } from 'app/entities/medicion/medicion.component';
import { MedicionService } from 'app/entities/medicion/medicion.service';
import { Medicion } from 'app/shared/model/medicion.model';

describe('Component Tests', () => {
  describe('Medicion Management Component', () => {
    let comp: MedicionComponent;
    let fixture: ComponentFixture<MedicionComponent>;
    let service: MedicionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [MedicionComponent]
      })
        .overrideTemplate(MedicionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Medicion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicions && comp.medicions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
