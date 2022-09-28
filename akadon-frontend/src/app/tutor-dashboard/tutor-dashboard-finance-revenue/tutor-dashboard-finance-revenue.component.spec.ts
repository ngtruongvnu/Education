import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardFinanceRevenueComponent } from './tutor-dashboard-finance-revenue.component';

describe('TutorDashboardFinanceRevenueComponent', () => {
  let component: TutorDashboardFinanceRevenueComponent;
  let fixture: ComponentFixture<TutorDashboardFinanceRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardFinanceRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardFinanceRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
