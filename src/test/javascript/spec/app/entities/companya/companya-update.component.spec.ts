import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IFisioTestModule } from '../../../test.module';
import { CompanyaUpdateComponent } from 'app/entities/companya/companya-update.component';
import { CompanyaService } from 'app/entities/companya/companya.service';
import { Companya } from 'app/shared/model/companya.model';

describe('Component Tests', () => {
  describe('Companya Management Update Component', () => {
    let comp: CompanyaUpdateComponent;
    let fixture: ComponentFixture<CompanyaUpdateComponent>;
    let service: CompanyaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IFisioTestModule],
        declarations: [CompanyaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CompanyaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompanyaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompanyaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Companya(123);
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
        const entity = new Companya();
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
