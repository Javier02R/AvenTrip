import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouristSiteDetailPage } from './tourist-site-detail.page';

describe('TouristSiteDetailPage', () => {
  let component: TouristSiteDetailPage;
  let fixture: ComponentFixture<TouristSiteDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristSiteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
