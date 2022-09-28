import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardFinanceBankingComponent } from './tutor-dashboard-finance-banking.component';

describe('TutorDashboardFinanceBankingComponent', () => {
  let component: TutorDashboardFinanceBankingComponent;
  let fixture: ComponentFixture<TutorDashboardFinanceBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardFinanceBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardFinanceBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
