import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { MedicionComponent } from './medicion.component';
import { MedicionDetailComponent } from './medicion-detail.component';
import { MedicionUpdateComponent } from './medicion-update.component';
import { MedicionDeleteDialogComponent } from './medicion-delete-dialog.component';
import { medicionRoute } from './medicion.route';

@NgModule({
  imports: [IFisioSharedModule],
  declarations: [MedicionComponent, MedicionDetailComponent, MedicionUpdateComponent, MedicionDeleteDialogComponent],
  entryComponents: [MedicionDeleteDialogComponent],
  exports: [MedicionComponent, MedicionDetailComponent, MedicionUpdateComponent, MedicionDeleteDialogComponent]
})
export class IFisioMedicionModule {}
