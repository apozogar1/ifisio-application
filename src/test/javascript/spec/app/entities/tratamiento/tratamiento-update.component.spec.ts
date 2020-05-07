import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { TratamientoUpdateComponent } from 'app/entities/tratamiento/tratamiento-update.component';
import { TratamientoService } from 'app/entities/tratamiento/tratamiento.service';
import { Tratamiento } from 'app/shared/model/tratamiento.model';

describe('Component Tests', () => {
  describe('Tratamiento Management Update Component', () => {
    let comp: TratamientoUpdateComponent;
    let fixture: ComponentFixture<TratamientoUpdateComponent>;
    let service: TratamientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [TratamientoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TratamientoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TratamientoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TratamientoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tratamiento(123);
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
        const entity = new Tratamiento();
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
