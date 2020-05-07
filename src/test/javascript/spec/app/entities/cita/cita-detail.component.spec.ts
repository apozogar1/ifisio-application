import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { CitaDetailComponent } from 'app/entities/cita/cita-detail.component';
import { Cita } from 'app/shared/model/cita.model';

describe('Component Tests', () => {
  describe('Cita Management Detail Component', () => {
    let comp: CitaDetailComponent;
    let fixture: ComponentFixture<CitaDetailComponent>;
    const route = ({ data: of({ cita: new Cita(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CitaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CitaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CitaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cita on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cita).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
