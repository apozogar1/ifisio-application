import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { CitaComponent } from './cita.component';
import { CitaDetailComponent } from './cita-detail.component';
import { CitaUpdateComponent } from './cita-update.component';
import { CitaDeleteDialogComponent } from './cita-delete-dialog.component';
import { citaRoute } from './cita.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(citaRoute)],
  declarations: [CitaComponent, CitaDetailComponent, CitaUpdateComponent, CitaDeleteDialogComponent],
  entryComponents: [CitaDeleteDialogComponent]
})
export class IFisioCitaModule {}
