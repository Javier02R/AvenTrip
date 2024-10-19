import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristSiteListPage } from './tourist-site-list.page';

const routes: Routes = [
  {
    path: '',
    component: TouristSiteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristSiteListPageRoutingModule {}
