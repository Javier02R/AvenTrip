import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouristSiteListPage } from './tourist-site-list.page';

describe('TouristSiteListPage', () => {
  let component: TouristSiteListPage;
  let fixture: ComponentFixture<TouristSiteListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristSiteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
