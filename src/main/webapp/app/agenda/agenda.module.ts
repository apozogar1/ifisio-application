import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { AgendaComponent } from './agenda.component';
import { AgendaRoute } from './agenda.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(AgendaRoute)],
  declarations: [AgendaComponent]
})
export class IFisioAgendaModule {}
