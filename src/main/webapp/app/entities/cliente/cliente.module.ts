import { NgModule } from '@angular/core';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { ClienteDeleteDialogComponent } from './cliente-delete-dialog.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteComponent } from './cliente.component';

@NgModule({
  imports: [IFisioSharedModule],
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent],
  entryComponents: [ClienteDeleteDialogComponent],
  exports: [ClienteComponent, ClienteDetailComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent]

})
export class IFisioClienteModule {}
