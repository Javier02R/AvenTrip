import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristSiteDetailPageRoutingModule } from './tourist-site-detail-routing.module';

import { TouristSiteDetailPage } from './tourist-site-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristSiteDetailPageRoutingModule
  ],
  declarations: [TouristSiteDetailPage]
})
export class TouristSiteDetailPageModule {}
