import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { TratamientoClienteComponent } from './tratamiento-cliente.component';
import { TratamientoClienteDetailComponent } from './tratamiento-cliente-detail.component';
import { TratamientoClienteUpdateComponent } from './tratamiento-cliente-update.component';
import { TratamientoClienteDeleteDialogComponent } from './tratamiento-cliente-delete-dialog.component';
import { tratamientoClienteRoute } from './tratamiento-cliente.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(tratamientoClienteRoute)],
  declarations: [
    TratamientoClienteComponent,
    TratamientoClienteDetailComponent,
    TratamientoClienteUpdateComponent,
    TratamientoClienteDeleteDialogComponent
  ],
  entryComponents: [TratamientoClienteDeleteDialogComponent]
})
export class IFisioTratamientoClienteModule {}
