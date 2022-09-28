import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardFinancePaymentComponent } from './tutor-dashboard-finance-payment.component';

describe('TutorDashboardFinancePaymentComponent', () => {
  let component: TutorDashboardFinancePaymentComponent;
  let fixture: ComponentFixture<TutorDashboardFinancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardFinancePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardFinancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
