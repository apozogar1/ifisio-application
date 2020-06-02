import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { TablaClienteComponent } from './tabla-cliente.component';
import { tablaClienteRoute } from './tabla-cliente.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(tablaClienteRoute)],
  declarations: [TablaClienteComponent]
})
export class IFisioTablaClienteModule {}
