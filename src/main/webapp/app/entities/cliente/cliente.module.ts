import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { ClienteDeleteDialogComponent } from './cliente-delete-dialog.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteComponent } from './cliente.component';
import { clienteRoute } from './cliente.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(clienteRoute)],
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent],
  entryComponents: [ClienteDeleteDialogComponent]
})
export class IFisioClienteModule {}
