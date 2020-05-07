import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { MedicionUpdateComponent } from 'app/entities/medicion/medicion-update.component';
import { MedicionService } from 'app/entities/medicion/medicion.service';
import { Medicion } from 'app/shared/model/medicion.model';

describe('Component Tests', () => {
  describe('Medicion Management Update Component', () => {
    let comp: MedicionUpdateComponent;
    let fixture: ComponentFixture<MedicionUpdateComponent>;
    let service: MedicionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [MedicionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MedicionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Medicion(123);
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
        const entity = new Medicion();
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
