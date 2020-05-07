import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { NumDocUpdateComponent } from 'app/entities/num-doc/num-doc-update.component';
import { NumDocService } from 'app/entities/num-doc/num-doc.service';
import { NumDoc } from 'app/shared/model/num-doc.model';

describe('Component Tests', () => {
  describe('NumDoc Management Update Component', () => {
    let comp: NumDocUpdateComponent;
    let fixture: ComponentFixture<NumDocUpdateComponent>;
    let service: NumDocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [NumDocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NumDocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumDocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumDocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NumDoc(123);
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
        const entity = new NumDoc();
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
