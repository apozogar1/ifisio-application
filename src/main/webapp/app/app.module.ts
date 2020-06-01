import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IFisioCoreModule } from 'app/core/core.module';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { IFisioAppRoutingModule } from './app-routing.module';
import { IFisioEntityModule } from './entities/entity.module';
import { IFisioHomeModule } from './home/home.module';
import { ErrorComponent } from './layouts/error/error.component';
import { FooterComponent } from './layouts/footer/footer.component';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { IFisioTablaClienteModule } from './tabla-cliente/tabla-cliente.module';
import './vendor';
import { IFisioAgendaModule } from './agenda/agenda.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IFisioSharedModule,
    IFisioCoreModule,
    IFisioHomeModule,
    IFisioTablaClienteModule,
    IFisioAgendaModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IFisioEntityModule,
    IFisioAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class IFisioAppModule {}
