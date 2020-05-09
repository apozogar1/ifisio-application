import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { IFisioCoreModule } from 'app/core/core.module';
import { IFisioAppRoutingModule } from './app-routing.module';
import { IFisioHomeModule } from './home/home.module';
import { IFisioEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { IFisioTablaClienteModule } from './tabla-cliente/tabla-cliente.module';

@NgModule({
  imports: [
    BrowserModule,
    IFisioSharedModule,
    IFisioCoreModule,
    IFisioHomeModule,
    IFisioTablaClienteModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IFisioEntityModule,
    IFisioAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class IFisioAppModule {}
