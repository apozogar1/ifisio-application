import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IFisioSharedModule } from 'app/shared/shared.module';
import { CompanyaComponent } from './companya.component';
import { CompanyaDetailComponent } from './companya-detail.component';
import { CompanyaUpdateComponent } from './companya-update.component';
import { CompanyaDeleteDialogComponent } from './companya-delete-dialog.component';
import { companyaRoute } from './companya.route';

@NgModule({
  imports: [IFisioSharedModule, RouterModule.forChild(companyaRoute)],
  declarations: [CompanyaComponent, CompanyaDetailComponent, CompanyaUpdateComponent, CompanyaDeleteDialogComponent],
  entryComponents: [CompanyaDeleteDialogComponent]
})
export class IFisioCompanyaModule {}
