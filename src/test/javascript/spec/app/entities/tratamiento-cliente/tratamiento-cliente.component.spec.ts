import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IFisioTestModule } from '../../../test.module';
import { TratamientoClienteComponent } from 'app/entities/tratamiento-cliente/tratamiento-cliente.component';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

describe('Component Tests', () => {
  describe('TratamientoCliente Management Component', () => {
    let comp: TratamientoClienteComponent;
    let fixture: ComponentFixture<TratamientoClienteComponent>;
    let service: TratamientoClienteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [TratamientoClienteComponent]
      })
        .overrideTemplate(TratamientoClienteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TratamientoClienteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TratamientoClienteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TratamientoCliente(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tratamientoClientes && comp.tratamientoClientes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
