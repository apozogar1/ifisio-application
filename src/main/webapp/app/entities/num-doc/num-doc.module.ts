import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { NumDocComponent } from './num-doc.component';
import { NumDocDetailComponent } from './num-doc-detail.component';
import { NumDocUpdateComponent } from './num-doc-update.component';
import { NumDocDeleteDialogComponent } from './num-doc-delete-dialog.component';
import { numDocRoute } from './num-doc.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(numDocRoute)],
  declarations: [NumDocComponent, NumDocDetailComponent, NumDocUpdateComponent, NumDocDeleteDialogComponent],
  entryComponents: [NumDocDeleteDialogComponent]
})
export class IFisioNumDocModule {}
