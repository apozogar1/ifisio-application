import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioMedicionModule } from 'app/entities/medicion/medicion.module';
import { IFisioNumDocModule } from 'app/entities/num-doc/num-doc.module';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { EdicionClienteComponent } from './edicion-cliente/edicion-cliente.component';
import { TablaClienteComponent } from './tabla-cliente.component';
import { tablaClienteRoute } from './tabla-cliente.route';
import { IFisioClienteModule } from 'app/entities/cliente/cliente.module';
import { IFisioTratamientoClienteModule } from 'app/entities/tratamiento-cliente/tratamiento-cliente.module';

@NgModule({
  imports: [IFisioSharedModule, IFisioClienteModule, IFisioNumDocModule, IFisioMedicionModule, IFisioTratamientoClienteModule, RouterModule.forChild(tablaClienteRoute)],
  declarations: [TablaClienteComponent, EdicionClienteComponent]
})
export class IFisioTablaClienteModule { }
