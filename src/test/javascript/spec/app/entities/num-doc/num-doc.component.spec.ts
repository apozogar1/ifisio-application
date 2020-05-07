import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { NumDocComponent } from 'app/entities/num-doc/num-doc.component';
import { NumDocService } from 'app/entities/num-doc/num-doc.service';
import { NumDoc } from 'app/shared/model/num-doc.model';

describe('Component Tests', () => {
  describe('NumDoc Management Component', () => {
    let comp: NumDocComponent;
    let fixture: ComponentFixture<NumDocComponent>;
    let service: NumDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [NumDocComponent]
      })
        .overrideTemplate(NumDocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumDocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumDocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NumDoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.numDocs && comp.numDocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
