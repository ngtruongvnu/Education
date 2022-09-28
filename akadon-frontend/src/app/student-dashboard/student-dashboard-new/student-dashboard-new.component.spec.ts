import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardNewComponent } from './student-dashboard-new.component';

describe('StudentDashboardNewComponent', () => {
  let component: StudentDashboardNewComponent;
  let fixture: ComponentFixture<StudentDashboardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
