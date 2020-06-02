import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { IFisioNumDocModule } from '../num-doc/num-doc.module';
import { ClienteDeleteDialogComponent } from './cliente-delete-dialog.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteComponent } from './cliente.component';
import { clienteRoute } from './cliente.route';
import { IFisioMedicionModule } from '../medicion/medicion.module';

@NgModule({
  imports: [IFisioSharedModule, IFisioNumDocModule, IFisioMedicionModule, RouterModule.forChild(clienteRoute)],
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent],
  entryComponents: [ClienteDeleteDialogComponent]
})
export class IFisioClienteModule {}
