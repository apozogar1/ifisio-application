import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { NumDocDetailComponent } from 'app/entities/num-doc/num-doc-detail.component';
import { NumDoc } from 'app/shared/model/num-doc.model';

describe('Component Tests', () => {
  describe('NumDoc Management Detail Component', () => {
    let comp: NumDocDetailComponent;
    let fixture: ComponentFixture<NumDocDetailComponent>;
    const route = ({ data: of({ numDoc: new NumDoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [NumDocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NumDocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NumDocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load numDoc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.numDoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
