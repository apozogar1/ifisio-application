import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { MedicionDetailComponent } from 'app/entities/medicion/medicion-detail.component';
import { Medicion } from 'app/shared/model/medicion.model';

describe('Component Tests', () => {
  describe('Medicion Management Detail Component', () => {
    let comp: MedicionDetailComponent;
    let fixture: ComponentFixture<MedicionDetailComponent>;
    const route = ({ data: of({ medicion: new Medicion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [MedicionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MedicionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medicion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
