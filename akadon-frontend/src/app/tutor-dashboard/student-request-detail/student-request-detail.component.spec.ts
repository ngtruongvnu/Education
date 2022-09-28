import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestDetailComponent } from './student-request-detail.component';

describe('StudentRequestDetailComponent', () => {
  let component: StudentRequestDetailComponent;
  let fixture: ComponentFixture<StudentRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
