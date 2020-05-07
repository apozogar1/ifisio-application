import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { CompanyaComponent } from 'app/entities/companya/companya.component';
import { CompanyaService } from 'app/entities/companya/companya.service';
import { Companya } from 'app/shared/model/companya.model';

describe('Component Tests', () => {
  describe('Companya Management Component', () => {
    let comp: CompanyaComponent;
    let fixture: ComponentFixture<CompanyaComponent>;
    let service: CompanyaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CompanyaComponent]
      })
        .overrideTemplate(CompanyaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompanyaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompanyaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Companya(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.companyas && comp.companyas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
