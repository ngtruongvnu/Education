import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardFinanceComponent } from './student-dashboard-finance.component';

describe('StudentDashboardFinanceComponent', () => {
  let component: StudentDashboardFinanceComponent;
  let fixture: ComponentFixture<StudentDashboardFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
