import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardHomeComponent } from './tutor-dashboard-home.component';

describe('TutorDashboardHomeComponent', () => {
  let component: TutorDashboardHomeComponent;
  let fixture: ComponentFixture<TutorDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
