import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    NgJhipsterModule,
    InfiniteScrollModule,
    FullCalendarModule,
    SelectButtonModule,
    TabViewModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class IFisioSharedLibsModule {}
