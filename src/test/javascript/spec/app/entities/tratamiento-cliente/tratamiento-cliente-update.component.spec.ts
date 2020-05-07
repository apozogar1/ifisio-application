import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { TratamientoClienteUpdateComponent } from 'app/entities/tratamiento-cliente/tratamiento-cliente-update.component';
import { TratamientoClienteService } from 'app/entities/tratamiento-cliente/tratamiento-cliente.service';
import { TratamientoCliente } from 'app/shared/model/tratamiento-cliente.model';

describe('Component Tests', () => {
  describe('TratamientoCliente Management Update Component', () => {
    let comp: TratamientoClienteUpdateComponent;
    let fixture: ComponentFixture<TratamientoClienteUpdateComponent>;
    let service: TratamientoClienteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [TratamientoClienteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TratamientoClienteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TratamientoClienteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TratamientoClienteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TratamientoCliente(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TratamientoCliente();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
