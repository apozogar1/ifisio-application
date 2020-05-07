import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { CompanyaDetailComponent } from 'app/entities/companya/companya-detail.component';
import { Companya } from 'app/shared/model/companya.model';

describe('Component Tests', () => {
  describe('Companya Management Detail Component', () => {
    let comp: CompanyaDetailComponent;
    let fixture: ComponentFixture<CompanyaDetailComponent>;
    const route = ({ data: of({ companya: new Companya(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CompanyaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CompanyaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompanyaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load companya on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.companya).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
