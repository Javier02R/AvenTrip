import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristSiteListPageRoutingModule } from './tourist-site-list-routing.module';

import { TouristSiteListPage } from './tourist-site-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristSiteListPageRoutingModule
  ],
  declarations: [TouristSiteListPage]
})
export class TouristSiteListPageModule {}
