import { NgModule } from '@angular/core';
import { IFisioSharedModule } from 'app/shared/shared.module';
import { NumDocDeleteDialogComponent } from './num-doc-delete-dialog.component';
import { NumDocDetailComponent } from './num-doc-detail.component';
import { NumDocUpdateComponent } from './num-doc-update.component';
import { NumDocComponent } from './num-doc.component';
import { RouterModule } from '@angular/router';
import { numDocRoute } from './num-doc.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(numDocRoute)],
  declarations: [NumDocComponent, NumDocDetailComponent, NumDocUpdateComponent, NumDocDeleteDialogComponent],
  entryComponents: [NumDocDeleteDialogComponent],
  exports: [NumDocComponent, NumDocDetailComponent, NumDocUpdateComponent, NumDocDeleteDialogComponent]
})
export class IFisioNumDocModule {}
