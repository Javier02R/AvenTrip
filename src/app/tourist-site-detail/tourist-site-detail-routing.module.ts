import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristSiteDetailPage } from './tourist-site-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TouristSiteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristSiteDetailPageRoutingModule {}
