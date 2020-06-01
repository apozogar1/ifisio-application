import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { AgendaComponent } from './agenda.component';
import { AgendaRoute } from './agenda.route';
import { IFisioCitaModule } from 'app/entities/cita/cita.module';

@NgModule({
  imports: [IFisioSharedModule, IFisioCitaModule, RouterModule.forChild(AgendaRoute)],
  declarations: [AgendaComponent]
})
export class IFisioAgendaModule {}
