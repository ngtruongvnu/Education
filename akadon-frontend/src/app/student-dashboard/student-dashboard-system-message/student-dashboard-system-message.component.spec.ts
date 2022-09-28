import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardSystemMessageComponent } from './student-dashboard-system-message.component';

describe('StudentDashboardSystemMessageComponent', () => {
  let component: StudentDashboardSystemMessageComponent;
  let fixture: ComponentFixture<StudentDashboardSystemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardSystemMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardSystemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
