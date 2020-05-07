import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { TratamientoComponent } from './tratamiento.component';
import { TratamientoDetailComponent } from './tratamiento-detail.component';
import { TratamientoUpdateComponent } from './tratamiento-update.component';
import { TratamientoDeleteDialogComponent } from './tratamiento-delete-dialog.component';
import { tratamientoRoute } from './tratamiento.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(tratamientoRoute)],
  declarations: [TratamientoComponent, TratamientoDetailComponent, TratamientoUpdateComponent, TratamientoDeleteDialogComponent],
  entryComponents: [TratamientoDeleteDialogComponent]
})
export class IFisioTratamientoModule {}
