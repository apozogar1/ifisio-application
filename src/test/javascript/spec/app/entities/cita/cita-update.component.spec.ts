import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { CitaUpdateComponent } from 'app/entities/cita/cita-update.component';
import { CitaService } from 'app/entities/cita/cita.service';
import { Cita } from 'app/shared/model/cita.model';

describe('Component Tests', () => {
  describe('Cita Management Update Component', () => {
    let comp: CitaUpdateComponent;
    let fixture: ComponentFixture<CitaUpdateComponent>;
    let service: CitaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CitaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CitaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CitaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CitaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cita(123);
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
        const entity = new Cita();
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
