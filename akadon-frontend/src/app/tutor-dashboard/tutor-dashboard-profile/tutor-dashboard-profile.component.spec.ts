import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardProfileComponent } from './tutor-dashboard-profile.component';

describe('TutorDashboardProfileComponent', () => {
  let component: TutorDashboardProfileComponent;
  let fixture: ComponentFixture<TutorDashboardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
