import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardFinanceComponent } from './tutor-dashboard-finance.component';

describe('TutorDashboardFinanceComponent', () => {
  let component: TutorDashboardFinanceComponent;
  let fixture: ComponentFixture<TutorDashboardFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
