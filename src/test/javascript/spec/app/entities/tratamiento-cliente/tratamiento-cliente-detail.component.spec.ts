import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { TratamientoClienteDetailComponent } from 'app/entities/tratamiento-cliente/tratamiento-cliente-detail.component';
import { TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

describe('Component Tests', () => {
  describe('TratamientoCliente Management Detail Component', () => {
    let comp: TratamientoClienteDetailComponent;
    let fixture: ComponentFixture<TratamientoClienteDetailComponent>;
    const route = ({ data: of({ tratamientoCliente: new TratamientoCliente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [TratamientoClienteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TratamientoClienteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TratamientoClienteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tratamientoCliente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tratamientoCliente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
