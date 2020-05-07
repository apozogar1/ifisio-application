import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { TratamientoComponent } from 'app/entities/tratamiento/tratamiento.component';
import { TratamientoService } from 'app/entities/tratamiento/tratamiento.service';
import { Tratamiento } from 'app/shared/model/tratamiento.model';

describe('Component Tests', () => {
  describe('Tratamiento Management Component', () => {
    let comp: TratamientoComponent;
    let fixture: ComponentFixture<TratamientoComponent>;
    let service: TratamientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [TratamientoComponent]
      })
        .overrideTemplate(TratamientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TratamientoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TratamientoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tratamiento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tratamientos && comp.tratamientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
